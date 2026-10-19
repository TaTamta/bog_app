# User Management App (Lit + Express + MongoDB)

A full-stack CRUD app for managing user records, built during the Bank of Georgia *Web Advanced* course in 2022. The front end uses **Lit web components**; the back end is an **Express** server backed by **MongoDB**.

## Features

- **Create and edit users** — a form component (`<app-user-form>`) for first name, last name, email and phone. One endpoint handles both insert and update.
- **User list with live filter** — `<app-user-list>` shows all users in a CSS Grid layout, with a search input and delete action.
- **Small REST layer** — `/api/:controller/:method` routes requests to controller methods, with a 404 for unknown endpoints.
- **WebSocket broadcast server** — a `ws` server on port 8088 that relays each message to all connected clients (groundwork for real-time updates).

## Tech stack

| Layer | Tools |
|---|---|
| Front end | Lit (`lit-element`) web components, Webpack, Babel |
| Back end | Node.js, Express, `ws` |
| Database | MongoDB (official Node.js driver) |

## Project structure

```
app/src/
├── components/     # <app-user-form>, <app-user-list>
├── core/           # Base element and REST client
└── app-root.js     # App shell
modules/clients.js  # User controller: list, create/update, delete
server.js           # Express API, static files, WebSocket server
```

## Getting started

Requires Node.js 18+ and a MongoDB instance (local or Atlas).

```bash
git clone https://github.com/TaTamta/bog_app.git
cd bog_app
npm install
npm run build            # bundle the front end into public/bundles
MONGODB_URI="mongodb://127.0.0.1:27017" npm start   # or your Atlas connection string
```

See `.env.example` for the variables the server reads. If `MONGODB_URI` is not set, it falls back to a local MongoDB.

The app runs at [http://localhost:8082](http://localhost:8082) and the WebSocket server at `ws://localhost:8088`.

## API

All endpoints take a JSON body via `POST`.

| Endpoint | Description |
|---|---|
| `/api/client/getClientInfo` | List all users |
| `/api/client/registerUser` | Create a user, or update one if `_id` is provided |
| `/api/client/deleteUser` | Delete a user by `_id` |

## Author

**Tamta Tavartkiladze** — [GitHub](https://github.com/TaTamta)
