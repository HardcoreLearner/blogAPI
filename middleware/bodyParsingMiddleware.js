const express = require('express');

const bodyParsingMiddleware = express.urlencoded({ extended: false });

module.exports = bodyParsingMiddleware;
