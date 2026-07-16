import test from "node:test";
import assert from "node:assert/strict";

test("allows missing SMTP values when email verification is disabled", async () => {
  process.env.NODE_ENV = "test";
  process.env.PORT = "3030";
  process.env.DB_HOST = "localhost";
  process.env.DB_PORT = "5432";
  process.env.DB_NAME = "gacha_test";
  process.env.DB_USER = "postgres";
  process.env.DB_PASSWORD = "postgres";
  process.env.JWT_SECRET = "test-secret";
  process.env.APP_URL = "http://localhost:3000";
  process.env.EMAIL_VERIFICATION_ENABLED = "false";

  delete process.env.SMTP_HOST;
  delete process.env.SMTP_PORT;
  delete process.env.SMTP_SECURE;
  delete process.env.SMTP_USERNAME;
  delete process.env.SMTP_PASSWORD;
  delete process.env.SMTP_FROM;

  const { env } = await import("./env.js");

  assert.equal(env.EMAIL_VERIFICATION_ENABLED, false);
  assert.equal(env.SMTP_HOST, "");
  assert.equal(env.SMTP_PORT, 587);
});
