const auth = require('../models/Auth');
const decodeJWTToken = require('../utils/jwt');

class UserAuthController {
    async createUser(req, res) {
        try {
            const { name, email, password } = req.body;
            const createUserResponse = await auth.register(name, email, password);
            res.json({ response: createUserResponse });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error: `${error}` });
        }
    }

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const loginUserResponse = await auth.login(email, password);
            res.json({ response: loginUserResponse });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error: `${error}` });
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
            res.status(500).json({ message: 'Internal Server Error', error: `${error}` });
        }
    }

    async updateProfile(req, res) {
        try {
            const { name, email, password } = req.body;
            const authHeader = req.headers.authorization;
            const token = authHeader.split(" ")[1];
            const data = await decodeJWTToken(token) // Decode the id of user
            const updateProfileResponse = await auth.update(data.id, name, email, password);
            res.json({ response: updateProfileResponse });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error: `${error}` });
        }
    }
}

module.exports = new UserAuthController();