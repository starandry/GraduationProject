import { defineConfig } from 'vite';

const baseUrl = process.env.VITE_BASE_URL || '/';

export default defineConfig({
    base: baseUrl, // Для чистых URL base должен совпадать с публичным путём раздачи
    css: {
        preprocessorOptions: {
            scss: {
                silenceDeprecations: ["legacy-js-api"],// Современный компилятор SCSS
            },
        },
    },
});
