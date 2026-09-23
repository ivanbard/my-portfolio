export async function getBlogViews() {
  const response = await fetch('/api/blog-views');
  if (!response.ok) throw new Error('Unable to load blog views');
  return (await response.json()).views;
}

export async function countBlogView(slug) {
  const key = `blog-viewed:${slug}`;
  if (sessionStorage.getItem(key)) return (await getBlogViews())[slug];

  sessionStorage.setItem(key, '1');
  try {
    const response = await fetch('/api/blog-views', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    });
    if (!response.ok) throw new Error('Unable to count blog view');
    return (await response.json()).views;
  } catch (error) {
    sessionStorage.removeItem(key);
    throw error;
  }
}
