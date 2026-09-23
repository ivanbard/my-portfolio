const postIds = [
  'building-recommendation-engine',
  'disappearance-of-the-ide',
  'embedded-systems-intro',
  'getting-started-with-xgboost',
  'looking-back-on-rbc-amplify',
  'my-internship-journey',
];

async function redis(command) {
  const response = await fetch(process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(command),
  });
  const data = await response.json();
  if (!response.ok || data.error) throw new Error(data.error || 'Redis request failed');
  return data.result;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');

  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const slug = req.body?.slug;
  if (req.method === 'POST' && !postIds.includes(slug)) {
    return res.status(400).json({ error: 'Unknown post' });
  }

  if (!(process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL)
    || !(process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN)) {
    return res.status(503).json({ error: 'View counter is not configured' });
  }

  try {
    if (req.method === 'POST') {
      const views = await redis(['INCR', `blog-views:${slug}`]);
      return res.status(200).json({ views });
    }

    const counts = await redis(['MGET', ...postIds.map((id) => `blog-views:${id}`)]);
    const views = Object.fromEntries(postIds.map((id, index) => [id, Number(counts[index] ?? 0)]));
    return res.status(200).json({ views });
  } catch (error) {
    console.error('Blog views request failed', error);
    return res.status(502).json({ error: 'Unable to load blog views' });
  }
}
