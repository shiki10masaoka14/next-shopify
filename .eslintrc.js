module.exports = {
  extends: [
    "next/core-web-vitals",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["utils/generated.ts"],
};
