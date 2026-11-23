// Uruchamiane przez husky przed commitem — tylko na plikach w stage.
export default {
  "*.{ts,tsx,js,mjs}": ["eslint --fix --no-warn-ignored --max-warnings=0", "prettier --write"],
  "*.{json,md,css,html,yml,yaml}": "prettier --write",
};
