# Backend Gacha API

## Run locally

1. Copy `.env.example` to `.env` and fill in your database and SMTP values.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open Swagger UI at:
   ```text
   http://localhost:3000/docs
   ```

## Available modules

- Auth: `/auth`
- User: `/users`
- Gacha Events: `/events`
- Gacha Draw: `/gacha`
