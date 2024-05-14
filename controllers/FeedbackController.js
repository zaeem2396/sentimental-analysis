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

    async get(req, res) {
        try {
            const feedbackData = await feedback.getFeedback();
            const feedbacks = feedbackData.data;

            if (feedbacks.length === 0) {
                return res.json({ page: 1, pageCount: 1, response: [] });
            }

            const pageCount = Math.ceil(feedbacks.length / 10);
            let page = parseInt(req.query.p || 1);

            if (page < 1 || page > pageCount) {
                res.status(400).json({ code: 200, message: 'Invalid page number or data not available' });
            }

            const startIndex = (page - 1) * 10;
            const endIndex = Math.min(startIndex + 10, feedbacks.length);

            res.json({ page_no: page, total: pageCount, total_data: feedbacks.length, response: feedbacks.slice(startIndex, endIndex) });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error: `${error}` });
        }
    }

}

module.exports = new FeedbackController()