# Flight Price Notifier

Static Vite + React single-page app — client-side routing with React Router, auth via Supabase.

## Routes

| Path       | Page                                     |
| ---------- | ---------------------------------------- |
| `/`        | Landing page                             |
| `/sign-in` | Sign in                                  |
| `/sign-up` | Sign up                                  |
| `/app`     | Dashboard (requires login → `/sign-in`)  |
| `/auth`    | Legacy URL, redirects to `/sign-in`      |

## Development

```sh
bun install    # or npm install
bun run dev    # http://localhost:5173
bun run build  # static output in dist/
```

## Environment variables

Needed at build time (locally in `.env`; on Vercel under Project → Settings → Environment Variables):

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

## Deploying to Vercel

Import the repo in Vercel. `vercel.json` sets the Vite preset, `vite build`, output `dist/`, and a
catch-all rewrite to `index.html` so deep links like `/app` resolve client-side.
