/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
    // For Development Server Configuration
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        const password = '001009jyk';
        const databaseName = 'task-manager';

        return {
            images: {
                domains: ['images.unsplash.com', 'lh3.googleusercontent.com'],
            },
            reactStrictMode: true,
            env: {
                APP_NAME: 'UseSchedule',
                API_DOMAIN_FULL: 'http://localhost:3000/api',
                API_DOMIN_RELATIVE: '/api',
                MONGODB_PASSWORD: password,
                MONGODB_DATABASE_NAME: databaseName,
                MONGODB_URL: `mongodb+srv://yunwi5:${password}@cluster0.yhtre.mongodb.net/${databaseName}?retryWrites=true&w=majority`,
                SENDGRID_API_KEY:
                    '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',
            },
        };
    }

    // For Production Server Configuration
    return {
        images: {
            domains: ['images.unsplash.com', 'lh3.googleusercontent.com'],
        },
        reactStrictMode: true,
        env: {
            API_DOMAIN_FULL: '',
            API_DOMIN_RELATIVE: '',
        },
    };
};
