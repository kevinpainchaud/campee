/**
 * @type {import('lint-staged').Configuration}
 */
export default {
  "*.{ts,tsx}": [
    () => "tsc --noEmit --project tsconfig.app.json",
    "eslint --cache --fix",
  ],
};
