import globals from "globals";
import eslint from "@eslint/js";
import tsEslint from "typescript-eslint";
import jest from "eslint-plugin-jest";

/**
 * Guiding documentation:
 * - ESLint config: https://eslint.org/docs/user-guide/configuring
 * - Jest plugin for ESLint: https://github.com/jest-community/eslint-plugin-jest?tab=readme-ov-file#running-rules-only-on-test-related-files
 */

export default tsEslint.config(
  eslint.configs.recommended,

  {
    files: ["tests/**"],
    ...jest.configs["flat/recommended"],
    rules: {
      ...jest.configs["flat/recommended"].rules,
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
      },
      globals: {
        jest: true,
        ...globals.browser,
      },
    },
  },
);
