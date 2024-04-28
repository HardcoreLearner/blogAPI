const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
const { secret } = require('../config/jwt'); // Import JWT secret from jwt.js

// Function to register a new user
exports.register = async (req, res) => {
    try {
        const { fname, lname, email, username, password, type } = req.body;
        const existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Email or username already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fname, lname, email, username, password: hashedPassword, type });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Function to login a user
exports.login = async (req, res) => {
    try {
        // User object is attached to request due to successful authentication
        const user = req.user;
        // Generate JWT token
        const token = jwt.sign({ id: user._id }, secret, { expiresIn: '1h' }); // Use JWT secret from jwt.js
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
