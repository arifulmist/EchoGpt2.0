import tsParser from "@typescript-eslint/parser";

const eslintConfig = [
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
