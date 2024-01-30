/** @type {import('@types/eslint').Linter.BaseConfig} */
module.exports = {
	extends: ['@remix-run/eslint-config', '@remix-run/eslint-config/node'],
	parserOptions: {
		tsconfigRootDir: __dirname,
		project: './tsconfig.json',
	},
	rules: {
		'@typescript-eslint/consistent-type-imports': 'off',
		'react/jsx-no-undef': 'off',
		'jsx-a11y/alt-text': 'off',
	},
}
