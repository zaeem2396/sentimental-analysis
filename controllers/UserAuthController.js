const auth = require('../models/Auth');
const decodeJWTToken = require('../utils/jwt');
const m = require('../utils/message')

class UserAuthController {

    /**
     * @swagger
     * /sentimental-analysis/api/user/create:
     *   post:
     *     summary: Create a new user
     *     tags:
     *       - Users
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *               - email
     *               - password
     *             properties:
     *               name:
     *                 type: string
     *               email:
     *                 type: string
     *                 format: email
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: User created successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 response:
     *                   type: object
     *       500:
     *         description: Internal Server Error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                 error:
     *                   type: string
     */
    async createUser(req, res) {
        try {
            const { name, email, password } = req.body;
            const createUserResponse = await auth.register(name, email, password);
            res.json({ response: createUserResponse });
        } catch (error) {
            res.status(500).json({ message: m.default.server_error, error: `${error}` });
        }
    }

    /**
     * @swagger
     * /sentimental-analysis/api/user/login:
     *   post:
     *     summary: User login
     *     tags:
     *       - Users
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - email
     *               - password
     *             properties:
     *               email:
     *                 type: string
     *                 format: email
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: login successful
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 response:
     *                   type: object
     *       500:
     *         description: Internal Server Error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                 error:
     *                   type: string
     */
    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
            const loginUserResponse = await auth.login(email, password);
            res.json({ response: loginUserResponse });
        } catch (error) {
            res.status(500).json({ message: m.default.server_error, error: `${error}` });
        }
    }


    /**
     * @swagger
     * /sentimental-analysis/api/user/profile:
     *   get:
     *     summary: Retrieve the user's profile
     *     tags:
     *       - Users
     *     security:
     *       - bearerAuth: []
     *     responses:
     *       200:
     *         description: Success
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 response:
     *                   type: object
     *                   description: User profile information
     *       500:
     *         description: Internal Server Error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                 error:
     *                   type: string
     */
    async getProfile(req, res) {
        try {
            const authHeader = req.headers.authorization;
            const token = authHeader.split(" ")[1];
            const data = await decodeJWTToken(token) // Decode the id of user
            const profileResponse = await auth.profile(data.id);
            res.json({ response: profileResponse });
        } catch (error) {
            res.status(500).json({ message: m.default.server_error, error: `${error}` });
        }
    }

    /**
     * @swagger
     * /sentimental-analysis/api/user/update:
     *   patch:
     *     summary: Update an existing user
     *     tags:
     *       - Users
     *     security:
     *       - bearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - name
     *               - email
     *               - password
     *             properties:
     *               name:
     *                 type: string
     *               email:
     *                 type: string
     *                 format: email
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: User updated successfully
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 response:
     *                   type: object
     *       500:
     *         description: Internal Server Error
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                 error:
     *                   type: string
     */
    async updateProfile(req, res) {
        try {
            const { name, email, password } = req.body;
            const authHeader = req.headers.authorization;
            const token = authHeader.split(" ")[1];
            const data = await decodeJWTToken(token) // Decode the id of user
            const updateProfileResponse = await auth.update(data.id, name, email, password);
            res.json({ response: updateProfileResponse });
        } catch (error) {
            res.status(500).json({ message: m.default.server_error, error: `${error}` });
        }
    }
}

module.exports = new UserAuthController();