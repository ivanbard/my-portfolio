# bardz.ca
My portfolio website, containing my information, and some projects.

Built using React + Vite in JavaScript. Potentially switch to another platform later.

## GitHub contributions

The homepage contribution chart uses the GitHub GraphQL API through a server-side endpoint.

Set `GITHUB_TOKEN` in Vercel and locally before running the site if you want the chart to load accurately.

Security notes:

- Keep `GITHUB_TOKEN` server-side only. Do not prefix it with `VITE_`, and do not hard-code it in client code.
- Use Vercel environment variables in production and a local untracked `.env` file in development.
- Start with the smallest GitHub token permissions that work for your contribution graph. GitHub's current docs say the permissions depend on the data you request.
- If you want private contributions to appear, your GitHub profile must be configured to show private contributions.
- Treat the contribution chart as a public output. If private contributions are included, visitors can see the private contribution counts for each day, even though repository details remain hidden.

Suggested setup:

1. Copy `.env.example` to `.env` locally and fill in `GITHUB_TOKEN`.
2. Add the same `GITHUB_TOKEN` value to your Vercel project environment variables.
3. Prefer a fine-grained personal access token if it works for your account and contribution visibility needs.
4. If a fine-grained token does not return the contribution calendar you expect, fall back to the smallest classic token scope that does.
