import localPlugin from '@mesto/eslint-plugin-local';

/** @type {import('eslint').Linter.Config[]} */
export default [
    ...localPlugin.configs.recommended,
    {
        files: ['src/index.js'],
        rules: {'unicorn/no-empty-file': 'off'},
    },
];
