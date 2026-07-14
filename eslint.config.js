// eslint.config.js

import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default [
    {
      ignores: ["node_modules", "dist"]
    },
  js.configs.recommended,

  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest"
      }
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn"],
      "no-console": "off"
    }
  },

  prettier // penting: disable conflict ESLint vs Prettier
];