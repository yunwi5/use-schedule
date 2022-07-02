/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

module.exports = withPWA({
    reactStrictMode: true,
    pwa: {
        dest: 'public',
        swSrc: 'service-worker.js',
        disable: process.env.NODE_ENV === 'development',
    },
    images: {
        domains: [
            'images.unsplash.com',
            // google profile image domain
            'lh3.googleusercontent.com',
            // facebook profile image domain
            'platform-lookaside.fbsbx.com',
        ],
    },
    env: {
        APP_NAME: 'UseSchedule',
        APP_AUTHOR: 'Yunwi5',
        API_DOMIN_RELATIVE: '/api',
        MONGODB_URL: `mongodb+srv://yunwi5:001009jyk@cluster0.yhtre.mongodb.net/task-manager?retryWrites=true&w=majority`,
    },
});
