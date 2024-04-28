require("dotenv").config();
const express = require('express');
const mongoose = require("mongoose");
const { mainModule } = require('process');
const connectDB = require("./config/db");

// Middlewares importation
const rateLimitMiddleware = require("./middleware/rateLimitMiddleware");
const compressionMiddleware = require("./middleware/compressionMiddleware");
const loggerMiddleware = require("./middleware/loggerMiddleware");
const bodyParsingMiddleware = require("./middleware/bodyParsingMiddleware");
const cookieParsingMiddleware = require("./middleware/cookieParsingMiddleware");
const staticFilesMiddleware = require("./middleware/staticFilesMiddleware");
const { notFoundHandler, errorHandler } = require('./middleware/errorHandlerMiddleware');

// All routes inside apiRouter
const apiRouter = require("./routes/apiRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Set up rate limiter: maximum of 40 requests per minute
app.use(rateLimitMiddleware);
app.use(express.static('public'));

// Set up compression
app.use(compressionMiddleware);

// Using Middlewares
app.use(loggerMiddleware);
app.use(express.json());
app.use(bodyParsingMiddleware);
app.use(cookieParsingMiddleware);
app.use(staticFilesMiddleware);

// using Router
app.use(apiRouter);

// error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
