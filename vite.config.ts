import { defineConfig } from 'vite';
import path from 'path';

const baseUrl = process.env.VITE_BASE_URL || '/';

export default defineConfig({
    base: baseUrl, // Для чистых URL base должен совпадать с публичным путём раздачи
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@app': path.resolve(__dirname, './src/app'),
            '@processes': path.resolve(__dirname, './src/processes'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@widgets': path.resolve(__dirname, './src/widgets'),
            '@features': path.resolve(__dirname, './src/features'),
            '@entities': path.resolve(__dirname, './src/entities'),
            '@shared': path.resolve(__dirname, './src/shared'),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                silenceDeprecations: ["legacy-js-api"],// Современный компилятор SCSS
            },
        },
    },
});
