/* ESLint config for the Vite + React + TypeScript frontend.
 * Previously linting was broken (package.json had only `{ "root": true }` with
 * no parser, so every file failed with "The keyword 'import' is reserved").
 * This configures the TypeScript parser and focuses the rules on real bugs
 * (React hooks correctness) while relaxing stylistic noise. */
module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  plugins: ["@typescript-eslint", "react-refresh"],
  ignorePatterns: ["dist", "node_modules", ".eslintrc.cjs", "vite.config.*", "*.config.js"],
  rules: {
    // Bug-catching rules stay strict:
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    // Relaxed for this FYP codebase to keep the signal on real issues:
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    "@typescript-eslint/ban-ts-comment": "off",
    "react-refresh/only-export-components": "off",
    "no-empty": ["warn", { allowEmptyCatch: true }],
    "prefer-const": "warn",
    // Non-breaking spaces inside display copy (JSX text / templates / strings)
    // are legitimate; only flag irregular whitespace that appears in actual code.
    "no-irregular-whitespace": [
      "error",
      { skipStrings: true, skipTemplates: true, skipJSXText: true, skipComments: true },
    ],
  },
};
