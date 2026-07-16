# Backend Documentation

## Overview

The backend is built with Node.js, TypeScript, Express, Sequelize, and PostgreSQL. It exposes REST APIs for authentication, user management, gacha event management, item management, and gacha history.

## Run locally

1. Copy the environment file:
   ```bash
   cp .env.example .env
   ```
2. Adjust the values for your local database and optional SMTP settings.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
5. Open Swagger UI at:
   ```text
   http://localhost:3030/docs
   ```

## Required environment variables

Key variables include:

- DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD
- JWT_SECRET
- APP_URL
- EMAIL_VERIFICATION_ENABLED
- SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD, SMTP_FROM (only needed when email verification is enabled)

> If EMAIL_VERIFICATION_ENABLED=false, SMTP values can stay empty and email verification will be skipped.

## Main modules

- Auth: /auth
- Users: /users
- Gacha events: /events
- Gacha draw and history: /gacha
- Items: /items

## Main endpoints

- POST /auth/register
- POST /auth/login
- GET /users/me
- POST /gacha/draw
- GET /gacha/history
- GET /gacha/admin/history
- GET /events
- POST /events
- GET /items
- POST /items

## Admin notes

- Admin routes are protected by the admin middleware.
- The admin can view all gacha draw logs via /gacha/admin/history.
- The default admin account can be seeded with:
  ```bash
  npm run seed:admin
  ```

## Database design

The backend uses these main entities:

- users
- gacha_events
- items
- gacha_event_items
- gacha_logs
- coin_transactions
- email_verifications

A simple relation summary:

```text
users 1---n gacha_logs
users 1---n coin_transactions
gacha_events 1---n gacha_event_items
gacha_events 1---n gacha_logs
items 1---n gacha_event_items
gacha_event_items 1---n gacha_logs
```

