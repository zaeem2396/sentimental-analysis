const auth = require('../models/Auth');

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
}

module.exports = new UserAuthController();
