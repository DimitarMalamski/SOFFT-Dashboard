import react from 'eslint-plugin-react';

export default [
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            parserOptions: { ecmaFeatures: { jsx: true } },
        },
        plugins: { react },
        rules: {
            ...react.configs.recommended.rules,
            'react/jsx-uses-vars': 'error',
            'react/jsx-uses-react': 'off',
        },
        settings: { react: { version: 'detect' } },
    },
];