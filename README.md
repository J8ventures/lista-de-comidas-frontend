# Lista de Comidas — Frontend

React + TypeScript SPA for managing personal recipes and meal plans.

## Stack

- React 18 + TypeScript
- Vite
- React Router v6
- TanStack Query v5
- Tailwind CSS
- Axios

## Local Development

### Prerequisites
- Node.js 18+
- Backend running at `localhost:3001` (see [lista-de-comidas-backend](https://github.com/J8Ventures/lista-de-comidas-backend))

### Setup

```bash
npm install
npm run dev
```

App available at http://localhost:5173. API requests to `/api/*` are proxied to `http://localhost:3001`.

### Other commands

```bash
npm run build    # TypeScript check + production build to dist/
npm run preview  # Preview production build locally
npm run lint     # ESLint
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | API base URL | `/api/v1` (uses Vite proxy in dev) |

Set `VITE_API_URL` to the API Gateway URL when deploying to production.

## Deployment

Deployed to AWS Amplify. Build configuration is in `amplify.yml`. The Amplify app is provisioned by the [lista-de-comidas-infrastructure](https://github.com/J8Ventures/lista-de-comidas-infrastructure) CDK stack, which also injects `VITE_API_URL` automatically.

## Features

- **Ingredients** — create and manage ingredients with nutritional group classification
- **Recipes** — create recipes with required, replaceable, and optional ingredients; define alternatives for replaceable ingredients
- **Meal Plans** — weekly/biweekly meal plans; add meals per day with forced alternative selection for replaceable ingredients
- **Grocery List** — auto-generated per meal plan, split into required and optional items with quantities aggregated across all entries
