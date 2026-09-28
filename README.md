# Todo App

A full-stack todo app. Create, read, update and delete todos through a React UI
backed by a FastAPI REST API and a Postgres database.

- Frontend: https://td-livid-ten.vercel.app/
- Backend API docs: https://td-production-4e2a.up.railway.app/docs

## Architecture

```
React (Vercel)  ->  FastAPI (Railway)  ->  Postgres (Supabase)
```

The frontend talks to the backend only through the REST API under `/api`.
The backend is layered: `routers/` (HTTP), `crud/` (database operations),
`models/` and `schemas/` (data shapes), `db.py` and `settings.py`
(connection and config).

## Tech stack

- Frontend: React, TypeScript, Vite
- Backend: Python, FastAPI, SQLModel
- Database: SQLite locally, Postgres (Supabase) in production
- Tests: pytest. CI: GitHub Actions

## Run locally

Backend:

```
python -m venv .venv
source .venv/bin/activate
cd backend
pip install -r requirements.txt
cp .env.example .env
uvicorn main:app --reload
```

The API runs at http://localhost:8000 and interactive docs at /docs.

Frontend (new terminal):

```
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open the URL Vite prints, usually http://localhost:5173. `FRONTEND_ORIGIN` in
`backend/.env` must match that URL exactly, including `localhost` versus
`127.0.0.1`, or the browser will block requests with a CORS error.

## Environment variables

| Where | Variable | Purpose |
|---|---|---|
| backend | `DATABASE_URL` | Database connection string |
| backend | `FRONTEND_ORIGIN` | Exact frontend origin allowed by CORS |
| frontend | `VITE_API_BASE_URL` | Backend base URL, baked in at build time |

## Tests

```
cd backend
python -m pytest
```

`npm run build` in `frontend/` also type-checks the frontend.

## Deployment notes

- Backend on Railway: root directory `backend`, start command
  `uvicorn main:app --host 0.0.0.0 --port $PORT`.
- Use Supabase's Session pooler connection string. The direct connection is
  IPv6-only and Railway cannot reach it.
- Frontend on Vercel: root directory `frontend`, with `VITE_API_BASE_URL` set
  to the Railway URL.
- Set `FRONTEND_ORIGIN` on Railway to the exact Vercel URL.

## Roadmap

See ROADMAP.md.