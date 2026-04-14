import { getGithubContributionsData } from '../lib/github-contributions.js';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const data = await getGithubContributionsData();

    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=43200');
    res.status(200).json(data);
  } catch (error) {
    console.error('GitHub contributions request failed', error);
    res.status(500).json({ error: 'Unable to load GitHub contributions' });
  }
}
