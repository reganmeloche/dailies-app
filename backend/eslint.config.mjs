import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.ts"], // all TypeScript files
    languageOptions: {
      parser: tsParser, // use the imported parser object, not a string
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      // Use the recommended TypeScript rules
      ...tsPlugin.configs.recommended.rules,
      // Optional: turn off the annoying unused-expressions rule for Winston logs
      "@typescript-eslint/no-unused-expressions": "off"
    },
  },
];
