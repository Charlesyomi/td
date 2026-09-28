# Todo App Roadmap
Submittable at any point = main passes CI, is deployed, and the README is current.
One item per branch. Prompt Aider in phases and review each phase.

## Phase 1: Presentable and safe
- [x] 1.1 README: live URLs, architecture, how to run and test (S)
- [x] 1.2 CI: pytest + frontend build on every PR (S)
- [ ] 1.3 Design tokens + dark theme (S)
- [ ] 1.4 Layout + TodoItem restyle: dense rows, status marker, #id, timestamp (M)
- [ ] 1.5 Visible loading, empty and error states (S)
- [ ] 1.6 Input validation: title max length, empty title rejected server-side, with tests (S)
- [ ] 1.7 /health endpoint + housekeeping (lifespan, datetime default, Pydantic warnings) FRONTEND_ORIGIN default in settings.py(S)

## Phase 2: Identity and ownership
- [ ] 2.1 Alembic migrations, baselined on the current schema (M)
- [ ] 2.2 Users + register/login: password hashing, JWT with expiry, secret key in env (L)
- [ ] 2.3 Ownership: user_id on todos, every query scoped to the current user (M)
- [ ] 2.4 Auth tests: bad/expired token, and user A cannot read, update or delete user B's todo (M)
- [ ] 2.5 Frontend: login/register screens, token handling, logout, 401 handling (M)
- [ ] 2.6 Security pass: rate-limit login, CORS stays exact, review what the API returns (S)

## Phase 3: Core todo features
- [ ] 3.1 Filter (all/open/done), search, sort, client-side (S)
- [ ] 3.2 Priority (M)
- [ ] 3.3 Due date + overdue highlighting (M)
- [ ] 3.4 Optimistic updates instead of refetching the whole list after every action (M)
- [ ] 3.5 Server-side filtering + pagination (M)

## Phase 4: Polish
- [ ] 4.1 Keyboard shortcuts (S)
- [ ] 4.2 Light/dark toggle (S)
- [ ] 4.3 Phone-width + accessibility pass: focus states, labels, contrast (M)
- [ ] 4.4 Undo delete via soft delete (M)
- [ ] 4.5 Structured logging + request IDs (S)

## Phase 5: Big features (each needs its own spec first)
- [ ] 5.1 Drag-and-drop ordering
- [ ] 5.2 Kanban view / grouping
- [ ] 5.3 History log + charts
- [ ] 5.4 Notifications, calendar and mail integration