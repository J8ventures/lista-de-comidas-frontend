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

- Node.js 20+
- Backend running at `localhost:3001` (see [lista-de-comidas-backend](https://github.com/J8Ventures/lista-de-comidas-backend))

### Setup

```bash
npm install
npm run dev
```

App available at http://localhost:5173. API requests to `/api/*` are proxied to `http://localhost:3001`.

### Commands

```bash
npm run build         # TypeScript check + production build to dist/
npm run preview       # Preview production build locally
npm run lint          # ESLint check
npm run format        # Apply Prettier formatting
npm run format:check  # Check formatting without modifying files
npm run type-check    # TypeScript check without building
npm run test          # Run unit tests
npm run test:watch    # Run tests in watch mode
npm run coverage      # Run tests with coverage report
```

## Testing

Unit tests use [Vitest](https://vitest.dev/) with `@testing-library/react`.

```bash
npm run coverage
```

Tests live alongside source files as `*.test.ts` / `*.test.tsx`. Currently covers the services layer (`src/services/`).

## Environment Variables

| Variable       | Description  | Default                            |
| -------------- | ------------ | ---------------------------------- |
| `VITE_API_URL` | API base URL | `/api/v1` (uses Vite proxy in dev) |

Set `VITE_API_URL` to the API Gateway URL when deploying to production.

## CI / CD

GitHub Actions workflows run on every push:

- **CI** (`.github/workflows/ci.yml`) — three parallel jobs: ESLint, TypeScript type-check, and Vitest with coverage report uploaded as an artifact.
- **Format** (`.github/workflows/format.yml`) — runs on push to `main`; auto-applies Prettier formatting and ESLint fixes, then commits back with `[skip ci]`.

## Deployment

Deployed to AWS Amplify. Build configuration is in `amplify.yml`. The Amplify app is provisioned by the [lista-de-comidas-infrastructure](https://github.com/J8Ventures/lista-de-comidas-infrastructure) CDK stack, which also injects `VITE_API_URL` automatically.

## Features

- **Ingredients** — create and manage ingredients with nutritional group classification
- **Recipes** — create recipes with required, replaceable, and optional ingredients; define alternatives for replaceable ingredients
- **Meal Plans** — weekly/biweekly meal plans; add meals per day with forced alternative selection for replaceable ingredients
- **Grocery List** — auto-generated per meal plan, split into required and optional items with quantities aggregated across all entries
