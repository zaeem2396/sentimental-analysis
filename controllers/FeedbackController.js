const feedback = require('../models/Feedback');
const decodeJWTToken = require('../utils/jwt');

class FeedbackController {

    /**
         * @swagger
         * /sentimental-analysis/api/feedback/create:
         *   post:
         *     summary: Feedback submitted successfully
         *     tags:
         *       - Feedback
         *     security:
         *       - bearerAuth: []
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             required:
         *               - content
         *             properties:
         *               content:
         *                 type: string
         *     responses:
         *       200:
         *         description: Feedback submitted successfully
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

    /**
     * @swagger
     * /sentimental-analysis/api/feedback/getFeedback:
     *   get:
     *     summary: Retrieve feedback
     *     tags:
     *       - Feedback
     *     parameters:
     *       - in: query
     *         name: p
     *         schema:
     *           type: integer
     *           default: 1
     *         description: Page number
     *     responses:
     *       200:
     *         description: Successful response
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 page_no:
     *                   type: integer
     *                 total:
     *                   type: integer
     *                 total_data:
     *                   type: integer
     *                 response:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       // Define properties of feedback item here
     *       400:
     *         description: Invalid page number or data not available
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 code:
     *                   type: integer
     *                 message:
     *                   type: string
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

            res.status(200).json({ page_no: page, total: pageCount, total_data: feedbacks.length, response: feedbacks.slice(startIndex, endIndex) });
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error', error: `${error}` });
        }
    }
}

module.exports = new FeedbackController()