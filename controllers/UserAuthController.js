const auth = require('../models/Auth');

class UserAuthController {
    async createUser(req, res) {
        try {
            const { name, email, password } = req.body;
            // console.log(req.body); return
            const createUserResponse = await auth.register(name, email, password);
            res.json({ response: createUserResponse });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

module.exports = new UserAuthController();
