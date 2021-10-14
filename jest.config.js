module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	globals: {
		'ts-jest': {
			tsconfig: './tsconfig.json',
		},
	},
	transform: {
		'^.+\\.jsx?$': 'babel-jest',
		'^.+\\.scss$': 'jest-scss-transform',
	},
	setupFilesAfterEnv: ['./jest.setup.ts'],
};
