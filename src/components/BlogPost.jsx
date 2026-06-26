import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { FiAlertTriangle, FiArrowLeft, FiCalendar, FiCheck, FiClock, FiCopy, FiInfo } from 'react-icons/fi';
import ReactMarkdown from 'react-markdown';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkDirective from 'remark-directive';
import remarkGfm from 'remark-gfm';
import { visit } from 'unist-util-visit';
import blogPosts from '../data/blogPosts';
import '../styles/BlogPost.css';

const calloutTypes = {
  note: { title: 'Note', icon: FiInfo },
  tip: { title: 'Tip', icon: FiCheck },
  warning: { title: 'Warning', icon: FiAlertTriangle },
  danger: { title: 'Danger', icon: FiAlertTriangle },
};

let highlighterPromise;

function getHighlighter() {
  highlighterPromise =
    highlighterPromise ||
    Promise.all([
      import('shiki/core'),
      import('shiki/engine/javascript'),
      import('shiki/themes/github-light.mjs'),
      import('shiki/langs/css.mjs'),
      import('shiki/langs/html.mjs'),
      import('shiki/langs/javascript.mjs'),
      import('shiki/langs/json.mjs'),
      import('shiki/langs/jsx.mjs'),
      import('shiki/langs/markdown.mjs'),
      import('shiki/langs/python.mjs'),
      import('shiki/langs/shellscript.mjs'),
      import('shiki/langs/tsx.mjs'),
      import('shiki/langs/typescript.mjs'),
    ]).then(
      ([
        { createHighlighterCore },
        { createJavaScriptRegexEngine },
        githubLight,
        css,
        html,
        javascript,
        json,
        jsx,
        markdown,
        python,
        shellscript,
        tsx,
        typescript,
      ]) =>
        createHighlighterCore({
          themes: [githubLight.default],
          langs: [
            css.default,
            html.default,
            javascript.default,
            json.default,
            jsx.default,
            markdown.default,
            python.default,
            shellscript.default,
            tsx.default,
            typescript.default,
          ],
          engine: createJavaScriptRegexEngine(),
        }),
    );

  return highlighterPromise;
}

function remarkCodeMeta() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      node.data = node.data || {};
      node.data.hProperties = {
        ...(node.data.hProperties || {}),
        'data-meta': node.meta || '',
      };
    });
  };
}

function remarkCallouts() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== 'containerDirective' || !calloutTypes[node.name]) return;

      const fallbackTitle = calloutTypes[node.name].title;
      const title = node.label || node.attributes?.title || fallbackTitle;

      node.data = node.data || {};
      node.data.hName = 'aside';
      node.data.hProperties = {
        className: `blog-callout blog-callout-${node.name}`,
        'data-callout-kind': node.name,
      };

      node.children.unshift({
        type: 'paragraph',
        data: {
          hName: 'p',
          hProperties: { className: 'blog-callout-title' },
        },
        children: [{ type: 'text', value: title }],
      });
    });
  };
}

function parseLineSet(value) {
  if (!value) return new Set();

  return value.split(',').reduce((lines, part) => {
    const [start, end] = part.trim().split('-').map(Number);

    if (!Number.isInteger(start)) return lines;

    const last = Number.isInteger(end) ? end : start;
    for (let line = start; line <= last; line += 1) {
      lines.add(line);
    }

    return lines;
  }, new Set());
}

function parseCodeMeta(meta = '') {
  const title = meta.match(/\[([^\]]+)\]/)?.[1] ?? '';
  const highlighted =
    meta.match(/\{([\d,\-\s]+)\}/)?.[1] ??
    meta.match(/(?:highlight|lines)=["']?([\d,\-\s]+)["']?/)?.[1] ??
    '';
  const focused = meta.match(/focus=["']?([\d,\-\s]+)["']?/)?.[1] ?? '';

  return {
    title,
    highlightedLines: parseLineSet(highlighted),
    focusedLines: parseLineSet(focused),
    showLineNumbers: /\b(line-numbers|show-line-numbers)\b/.test(meta),
    wrap: /\b(show-wrap|wrap)\b/.test(meta),
  };
}

function applyLineDecorations(html, highlightedLines, focusedLines) {
  if (!highlightedLines.size && !focusedLines.size) return html;

  let line = 0;
  return html.replace(/<span class="line">/g, () => {
    line += 1;
    const classes = ['line'];

    if (highlightedLines.has(line)) classes.push('highlighted');
    if (focusedLines.size) classes.push(focusedLines.has(line) ? 'focused' : 'dimmed');

    return `<span class="${classes.join(' ')}">`;
  });
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function plainCodeHtml(code) {
  const lines = code.split('\n').map((line) => `<span class="line">${escapeHtml(line)}</span>`);
  return `<pre class="shiki blog-plain-code"><code>${lines.join('\n')}</code></pre>`;
}

async function highlightCode(code, language) {
  if (!language || language === 'text') return plainCodeHtml(code);

  try {
    const highlighter = await getHighlighter();

    return highlighter.codeToHtml(code, {
      lang: language,
      theme: 'github-light',
    });
  } catch {
    return plainCodeHtml(code);
  }
}

function getNodeMeta(node) {
  return node?.properties?.dataMeta || node?.properties?.['data-meta'] || '';
}

function CodeBlock({ children, className, node }) {
  const code = String(children).replace(/\n$/, '');
  const language = className?.replace('language-', '') || 'text';
  const meta = getNodeMeta(node);
  const { title, highlightedLines, focusedLines, showLineNumbers, wrap } = useMemo(() => parseCodeMeta(meta), [meta]);
  const [html, setHtml] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function highlight() {
      const highlighted = await highlightCode(code, language);

      if (!cancelled) {
        setHtml(applyLineDecorations(highlighted, highlightedLines, focusedLines));
      }
    }

    highlight();

    return () => {
      cancelled = true;
    };
  }, [code, focusedLines, highlightedLines, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };

  return (
    <figure
      className={`blog-code-block ${showLineNumbers ? 'with-line-numbers' : ''} ${focusedLines.size ? 'with-focus' : ''} ${wrap ? 'wrap' : ''}`}
      data-language={language}
    >
      <figcaption className="blog-code-header">
        {title && <span className="blog-code-title">{title}</span>}
        <span className="blog-code-actions">
          <span className="blog-code-language">{language}</span>
          <button
            type="button"
            className="blog-code-copy"
            onClick={handleCopy}
            aria-label={copied ? 'Copied code' : 'Copy code'}
            title={copied ? 'Copied' : 'Copy code'}
          >
            {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
          </button>
        </span>
      </figcaption>
      <div className="blog-code-shell">
        {html ? (
          <div className="blog-code-scroll" dangerouslySetInnerHTML={{ __html: html }} />
        ) : (
          <pre className="blog-code-loading">
            <code>{code}</code>
          </pre>
        )}
      </div>
    </figure>
  );
}

function MarkdownCode({ node, className, children, ...props }) {
  const code = String(children);
  const isBlock = code.includes('\n') || className?.startsWith('language-') || getNodeMeta(node);

  if (isBlock) {
    return <CodeBlock className={className} node={node}>{children}</CodeBlock>;
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

function Callout({ node, children, ...props }) {
  const kind = node?.properties?.dataCalloutKind || node?.properties?.['data-callout-kind'] || 'note';
  const Icon = calloutTypes[kind]?.icon ?? FiInfo;

  return (
    <aside {...props}>
      <span className="blog-callout-icon" aria-hidden="true">
        <Icon size={15} />
      </span>
      <div className="blog-callout-body">{children}</div>
    </aside>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((entry) => entry.id === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <article className="page blog-post">
      <div className="page-shell">
        <Link to="/blog" className="back-link">
          <FiArrowLeft size={16} />
          Back
        </Link>

        <header className="blog-post-header">
          <div className="blog-post-meta">
            <span>
              <FiCalendar size={14} />
              {post.date}
            </span>
            <span>
              <FiClock size={14} />
              {post.readTime}
            </span>
          </div>
          <h1>{post.title}</h1>
        </header>

        <div className="blog-post-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkDirective, remarkCallouts, remarkCodeMeta]}
            rehypePlugins={[
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'wrap', properties: { className: 'heading-anchor' } }],
            ]}
            components={{
              aside: Callout,
              code: MarkdownCode,
              pre: ({ children }) => children,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
