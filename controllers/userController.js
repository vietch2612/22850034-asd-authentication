const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models').User;

async function register(req, res) {
    try {
        const { name, email, password, phone_number, address } = req.body;

        if (!(email && password && name && phone_number && address)) {
            return res.status(400).json({ message: 'All input is required' });
        }

        const existingUser = await User.findOne({ where: { phone_number } });

        if (existingUser) {
            return res.status(409).json({ message: 'User Already Exist. Please Login' });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            phone_number,
            address,
        });

        const token = jwt.sign({ user_id: user.id, phone_number }, process.env.TOKEN_KEY, {
            expiresIn: '2h',
        });

        user.token = token;
        return res.status(201).json(user);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function login(req, res) {
    try {
        const { phone_number, password } = req.body;

        if (!(phone_number && password)) {
            return res.status(400).json({ message: 'All input is required' });
        }

        const user = await User.findOne({ where: { phone_number } });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ user_id: user.id, phone_number }, process.env.TOKEN_KEY, {
                expiresIn: '2h',
            });

            user.token = token;
            return res.status(200).json(user);
        } else {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { register, login };