import js from '@eslint/js'; // Основные правила для JavaScript
import globals from 'globals'; // Глобальные переменные для окружений (например, браузер)
import reactHooks from 'eslint-plugin-react-hooks'; // Плагин для React Hooks
import reactRefresh from 'eslint-plugin-react-refresh'; // Поддержка React Refresh
import tsEslintPlugin from '@typescript-eslint/eslint-plugin'; // Плагин TypeScript ESLint
import tsParser from '@typescript-eslint/parser'; // Парсер TypeScript
import prettier from 'eslint-plugin-prettier'; // Плагин Prettier
import prettierConfig from 'eslint-config-prettier'; // Конфигурация Prettier

export default [
    // Конфигурация для JavaScript и JSX
    {
        files: ['**/*.{js,jsx}'],
        languageOptions: {
            ecmaVersion: 2020, //Устанавливает версию ECMAScript
            globals: globals.browser, // Глобальные переменные для браузера переменные (window, document)
        },
        ...js.configs.recommended, //задаются базовые настройки, кот  можно изменить или расширить
    },
    // Конфигурация для TypeScript и TSX
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tsParser, // Указываем корректный парсер
            ecmaVersion: 2020, //Устанавливает версию ECMAScript
        },
        plugins: {
            '@typescript-eslint': tsEslintPlugin,
        },
        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
        },
    },
    // Конфигурация для React Hooks и React Refresh
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: {
            'react-hooks': reactHooks, //проверка хуков
            'react-refresh': reactRefresh, //горячая перезагрузка комп
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn', //Если правило нарушается, ESLint выдаст предупреждение (не ошибку)
                {
                    allowConstantExport: true,
                },
            ],
        },
    },
    // Конфигурация для Prettier
    {
        plugins: {
            prettier, // Подключаем плагин Prettier
        },
        rules: {
            'prettier/prettier': 'error', // Применяем правила Prettier как ошибки
        },
        ...prettierConfig, // Отключаем конфликтующие правила ESLint
    },
    // Игнорируем папку dist
    {
        ignores: ['dist'],
    },
];
