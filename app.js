require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

// Importing user context
const User = require('./models').User;

// Register
app.post('/register', async (request, res) => {
    // Our register logic starts here
    try {
        // Get user input
        const { name, email, password, phone_number, address } = request.body;

        // Validate user input
        if (!(email && password && name && phone_number && address)) {
            res.status(400).send('All input is required');
        }

        // Check if user already exist
        // Validate if user exist in our database
        const existingUsers = await User.findOne({
            where: {
                phone_number,
            },
        });

        if (existingUsers) {
            return res.status(409).send('User Already Exist. Please Login');
        }

        // Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        const user = await User.create({
            name,
            email: email.toLowerCase(), // Sanitize: convert email to lowercase
            password: encryptedPassword,
            phone_number,
            address,
        });

        // Create token
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: '2h',
            },
        );
        // Save user token
        user.token = token;

        // Return new user
        res.status(201).json(user);
    } catch (error) {
        console.log(error);
    }
    // Our register logic ends here
});

app.post('/login', async (request, res) => {
    // Our login logic starts here
    try {
        // Get user input
        const { phone_number, password } = request.body;

        // Validate user input
        if (!(phone_number && password)) {
            res.status(400).send('All input is required');
        }

        // Validate if user exist in our database
        const user = await User.findOne({
            where: {
                phone_number,
            },
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
                { user_id: user._id, phone_number },
                process.env.TOKEN_KEY,
                {
                    expiresIn: '2h',
                },
            );

            // Save user token
            user.token = token;

            // User
            res.status(200).json(user);
        } else {
            res.status(400).send('Invalid Credentials');
        }
    } catch (error) {
        console.log(error);
    }
    // Our register logic ends here
});

const auth = require('./middleware/auth');

app.get('/verify', auth, (request, res) => {
    console.log("Verifying a new request!")
    res.status(200).json({
        sucess: true,
        message: ""
    });
});

module.exports = app;
