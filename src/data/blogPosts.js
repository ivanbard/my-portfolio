const postFiles = import.meta.glob('../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function parseFrontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!match) {
    return { data: {}, content: source };
  }

  const data = match[1].split(/\r?\n/).reduce((frontmatter, line) => {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) return frontmatter;

    const key = line.slice(0, separatorIndex).trim();
    const rawValue = line.slice(separatorIndex + 1).trim();

    if (rawValue.startsWith('[') && rawValue.endsWith(']')) {
      frontmatter[key] = rawValue
        .slice(1, -1)
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
      return frontmatter;
    }

    frontmatter[key] = rawValue.replace(/^['"]|['"]$/g, '');
    return frontmatter;
  }, {});

  return {
    data,
    content: source.slice(match[0].length),
  };
}

function slugFromPath(path) {
  return path.split('/').pop().replace(/\.md$/, '');
}

function parseDate(value) {
  if (!value) return null;
  if (value instanceof Date) return value;

  const parsed = new Date(`${value}T00:00:00Z`);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatPostDate(value) {
  const date = parseDate(value);

  if (!date) return value ?? '';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

const blogPosts = Object.entries(postFiles)
  .map(([path, source]) => {
    const { data, content } = parseFrontmatter(source);
    const slug = slugFromPath(path);
    const date = data.date ?? '';

    return {
      id: data.id ?? slug,
      title: data.title ?? slug,
      date: formatPostDate(date),
      dateValue: parseDate(date)?.toISOString() ?? '',
      excerpt: data.excerpt ?? '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      readTime: data.readTime ?? '',
      content: content.trim(),
    };
  })
  .sort((a, b) => b.dateValue.localeCompare(a.dateValue));

export default blogPosts;
