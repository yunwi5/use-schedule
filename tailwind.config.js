const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./components/**/*.{js,jsx,ts,tsx}'],
    theme: {
        screens: {
            xs: '400px',
            ...defaultTheme.screens,
        },
        extend: {
            controlIcon: {},
        },
    },
    plugins: [],
};
