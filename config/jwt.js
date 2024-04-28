require('dotenv').config(); // Load environment variables from .env file

module.exports = {
    secret: process.env.JWT_SECRET || 'default_secret',
    expiresIn: '1h' // Example token expiration time (1 hour)
};
