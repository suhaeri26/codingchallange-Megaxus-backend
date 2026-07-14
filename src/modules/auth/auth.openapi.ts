import { registry } from "../../docs/registry";

import {
  loginSchema,
  registerSchema,
  resendVerificationSchema,
  verifyEmailQuerySchema,
} from "./auth.schema";

registry.registerPath({
  method: "post",
  path: "/auth/register",
  tags: ["Authentication"],
  summary: "Register new user",
  request: {
    body: {
      content: {
        "application/json": {
          schema: registerSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Register successful",
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/auth/login",
  tags: ["Authentication"],
  summary: "Login",
  request: {
    body: {
      content: {
        "application/json": {
          schema: loginSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Login successful",
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/auth/logout",
  tags: ["Authentication"],
  summary: "Logout",
  responses: {
    200: {
      description: "Logout successful",
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/auth/me",
  tags: ["Authentication"],
  summary: "Get current user",
  security: [{ cookieAuth: [] }],
  responses: {
    200: {
      description: "Success",
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/auth/verify-email",
  tags: ["Authentication"],
  summary: "Verify email",
  security: [{ cookieAuth: [] }],
  request: {
    query: verifyEmailQuerySchema,
  },
  responses: {
    200: {
      description: "Email verified",
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/auth/resend-verification",
  tags: ["Authentication"],
  summary: "Resend email verification",
  request: {
    body: {
      content: {
        "application/json": {
          schema:
            resendVerificationSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description:
        "Verification email sent",
    },
  },
});