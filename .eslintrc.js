module.exports = {
	'env': {
		'browser': true,
		'commonjs': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 15
	},
	'plugins': [
		'@typescript-eslint'
	],
	'rules': {
		'indent': [
			'error',
			'tab'
		],
		'no-var-requires': 0,
		'max-len': [
			'error',
			{ code: 140 }
		],
		'prefer-const': [
			'warn',
			{
				'destructuring': 'any',
				'ignoreReadBeforeAssign': false
			}
		],
		'quotes': [
			'error',
			'single'
		],
		'semi': [
			'error',
			'always'
		],
		'no-var': 'error',
		'no-lonely-if': 'warn',
		'eqeqeq': [
			'warn',
			'always'
		],
		'no-use-before-define': 'error'
	},
	ignorePatterns: [
		'build/*'
	]
};
