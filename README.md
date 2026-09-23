# bardz.ca

Personal portfolio site built with React and Vite.

## Local Development

```sh
npm install
npm run dev
```

```sh
npm run lint
npm run build
```

The GitHub activity chart uses `GITHUB_TOKEN` through a server-side endpoint. Keep that token in local/Vercel environment variables only, never in client code.

Blog view counts use Upstash Redis. Connect Upstash to the Vercel project, or set `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in your local `.env` and Vercel project environment. The Vercel integration's `KV_REST_API_URL` and `KV_REST_API_TOKEN` variables work too. Counts start at zero when the database is connected. Add new post slugs to `api/blog-views.js` when publishing a post.
