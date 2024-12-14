import localPlugin from '@mesto/eslint-plugin-local';

/** @type {import('eslint').Linter.Config[]} */
export default [...localPlugin.configs.recommended];
