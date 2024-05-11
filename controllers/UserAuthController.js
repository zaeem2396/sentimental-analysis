const auth = require('../models/Auth');
// const jwt = require('jsonwebtoken');
const decodeJWTToken = require('../utils/jwt');

class UserAuthController {
    async createUser(req, res) {
        try {
            const { name, email, password } = req.body;
            const createUserResponse = await auth.register(name, email, password);
            res.json({ response: createUserResponse });
        } catch (error) {
            // console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const loginUserResponse = await auth.login(email, password);
            res.json({ response: loginUserResponse });
        } catch (error) {
            // console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    async getProfile(req, res) {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader.split(" ")[1];
            const data = await decodeJWTToken(token) // Decode the id of user
            const profileResponse = await auth.profile(data.id);
            res.json({ response: profileResponse });
        } catch (error) {
            // console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new UserAuthController();