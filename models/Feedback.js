const { con } = require('../config/db')
const Sentiment = require('sentiment');
const m = require('../utils/message')
const sentiment = new Sentiment();

class Feedback {
    async createFeedback(userId, content) {
        try {
            const [feedback, _] = await con.execute('INSERT INTO feedback (user_id, content) VALUES (?,?)', [userId, content])
            if (feedback) {
                return { code: 200, message: m.feedback.feedback_submitted }
            } else {
                return { code: 500, message: m.feedback.something_went_wrong }
            }
        } catch (error) {
            return { code: 500, message: m.default.system_error, more_info: error }
        }
    }

    async getFeedback() {
        try {
            const [feedback, _] = await con.execute('SELECT u.name as contomer_name, f.content as feedback, f.created_at as created FROM feedback as f INNER JOIN user as u ON u.id=f.user_id ORDER BY f.id DESC')
            if (feedback) {
                feedback.forEach(element => {
                    const result = sentiment.analyze(element.feedback);
                    element.sentiment_score = result.score
                });
                return { code: 200, message: m.default.success, data: feedback }
            } else {
                return { code: 404, message: m.default.no_data_found }
            }
        } catch (error) {
            return { code: 500, message: m.default.system_error, more_info: error }
        }
    }
}

module.exports = new Feedback()