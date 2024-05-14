const feedback = require('../models/Feedback');
const decodeJWTToken = require('../utils/jwt');

class FeedbackController {
    async create(req, res) {
        try {
            const { content } = req.body
            const authHeader = req.headers.authorization
            const token = authHeader.split(" ")[1];
            const user = await decodeJWTToken(token) // Decode the id of user
            const userId = user.id
            const newFeedback = await feedback.createFeedback(userId, content)
            res.json({ response: newFeedback })
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error: `${error}` });
        }
    }
}

module.exports = new FeedbackController()