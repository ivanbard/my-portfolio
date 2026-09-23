import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { getGithubContributionsData } from './lib/github-contributions.js';
import blogViewsHandler from './api/blog-views.js';

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

function blogViewsDevApi() {
  return {
    name: 'blog-views-dev-api',
    configureServer(server) {
      server.middlewares.use('/api/blog-views', async (req, res) => {
        let body = '';
        for await (const chunk of req) body += chunk;
        try {
          req.body = body ? JSON.parse(body) : undefined;
        } catch {
          res.statusCode = 400;
          res.end('Invalid JSON');
          return;
        }

        res.status = (code) => {
          res.statusCode = code;
          return res;
        };
        res.json = (data) => {
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(data));
          return res;
        };
        await blogViewsHandler(req, res);
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

  for (const key of ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN', 'KV_REST_API_URL', 'KV_REST_API_TOKEN']) {
    if (!process.env[key] && env[key]) process.env[key] = env[key];
  }

  return {
    plugins: [react(), githubContributionsDevApi(), blogViewsDevApi()],
  };
});
