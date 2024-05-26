const { con } = require('../config/db')
const Sentiment = require('sentiment');
const sentiment = new Sentiment();

class Feedback {
    async createFeedback(userId, content) {
        try {
            const [feedback, _] = await con.execute('INSERT INTO feedback (user_id, content) VALUES (?,?)', [userId, content])
            if (feedback) {
                return { code: 200, message: 'Feedback submitted successfully' }
            } else {
                return { code: 500, message: 'Something went wrong' }
            }
        } catch (error) {
            return { code: 500, message: 'system error occured', more_info: error }
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
                return { code: 200, message: 'success', data: feedback }
            } else {
                return { code: 404, message: 'No data found' }
            }
        } catch (error) {
            return { code: 500, message: 'system error occured', more_info: error }
        }
    }
}

module.exports = new Feedback()