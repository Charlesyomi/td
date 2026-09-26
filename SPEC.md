Build a todo app: FastAPI backend, SQLModel ORM, React/TypeScript
frontend. Concept to production — deployed, not local-only.

STACK & STATE
- Backend: FastAPI + SQLModel.
- DB: SQLite for local dev, Supabase (Postgres) for deployed/prod —
  same SQLModel code, only the connection string changes via env
  var. Don't hardcode a DB-specific query anywhere; if you can't
  avoid one, isolate it behind the DB layer, not scattered in routes.
- Frontend: React + TypeScript, talks to the backend only through
  the REST API — no direct DB access from the frontend, ever.
- Deployment: backend on Render (free tier), frontend on Vercel
  (free tier). Config for both lives in env vars, not hardcoded URLs.

FUNCTIONAL SCOPE
- Create, read (list/get), update, delete a todo, via API endpoints
  consumed by the React UI.
- Each todo: id, title, status (done/not done), created_at.

ARCHITECTURE
- Open/Closed via FastAPI's APIRouter: each feature area gets its
  own router, included in main.py. Adding a new feature means
  writing a new router file and one include_router() line — not
  editing existing route files.
- Layer split: models (SQLModel schema), crud (DB operations, no
  HTTP awareness), routes (HTTP layer only, calls crud), frontend
  (calls API only, no business logic beyond display).
- Explicit request/response schemas (Pydantic models) separate from
  the DB model — don't leak the DB schema straight into the API.

CORRECTNESS
- CORS explicitly configured for the deployed frontend origin only —
  not a wildcard. State why wildcard CORS is wrong here.
- DB-generated IDs (not app-generated) — say why that's the right
  call once there's a real database instead of a JSON file.
- Environment-based config (dev vs prod DB, dev vs prod frontend
  origin) via a single settings module — no scattered os.environ
  calls.

UI extensibility — not overcomplicating, one line covers it. Component-per-feature in React (a components/ folder, one file per UI piece, no giant App.tsx) gives you the same Open/Closed property you already built into the backend. That's it — not a separate design problem.

VERIFICATION
- Backend: pytest against the crud layer using an isolated test DB
  (not the dev SQLite file), plus at least one test per route.
- Frontend: confirm each UI action (add/edit/delete/toggle) actually
  round-trips through the real API, not a mocked one, at least once
  manually before calling it done.
- Explain any non-obvious choice in comments — same rule as before.

DONE = app deployed and reachable at a public URL, all CRUD works
end-to-end through the real UI against the real deployed DB, tests
pass, and adding one throwaway new route requires only a new router
file — no edits to existing route files to prove it.