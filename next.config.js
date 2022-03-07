/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
  // For Development Server Configuration
  if (phase === PHASE_DEVELOPMENT_SERVER) {

    const password = '001009jyk';
    const databaseName = 'task-manager';

    return {
      reactStrictMode: true,
      env: {
        API_DOMAIN_FULL: "http://localhost:3000/api",
        API_DOMIN_RELATIVE: "/api",
        MONGODB_PASSWORD: password,
        MONGODB_DATABASE_NAME: databaseName,
        MONGODB_URL: `mongodb+srv://yunwi5:${password}@cluster0.yhtre.mongodb.net/${databaseName}?retryWrites=true&w=majority`,
      }
    }
  }

  // For Production Server Configuration 
  return {
    reactStrictMode: true,
    env: {
      API_DOMAIN_FULL: '',
      API_DOMIN_RELATIVE: ''
    }
  }
};