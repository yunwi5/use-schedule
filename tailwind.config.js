const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    content: ['./components/**/*.{js,jsx,ts,tsx}'],
    theme: {
        width: {
            ...defaultTheme.width,
            'max-content': 'max-content',
        },
        screens: {
            xs: '400px',
            ...defaultTheme.screens,
            '2xl': '1400px',
        },
        extend: {
            controlIcon: {},
        },
    },
    plugins: [],
};
