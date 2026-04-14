import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { getGithubContributionsData } from './lib/github-contributions.js';

function githubContributionsDevApi() {
  return {
    name: 'github-contributions-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/github-contributions', async (req, res) => {
        if (req.method !== 'GET') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        try {
          const data = await getGithubContributionsData();

          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
        } catch (error) {
          console.error('GitHub contributions request failed', error);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Unable to load GitHub contributions' }));
        }
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  if (!process.env.GITHUB_TOKEN && env.GITHUB_TOKEN) {
    process.env.GITHUB_TOKEN = env.GITHUB_TOKEN;
  }

  return {
    plugins: [react(), githubContributionsDevApi()],
  };
});
