/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            colors: {
                primary: '#ba68c8',
                secondary: '#94a3b8',
                'gray-blue': '#475569',
                error: '#d32f2f',
                'soft-white': '#FBFAF5',
                success: '#5cb85c',
            },
        },
    },
    important: true,
    plugins: [],
};
