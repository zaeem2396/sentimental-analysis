const { con } = require('../config/db')

class Feedback {
    async createFeedback(userId, content) {
        try {
            const [feedback, _] = await con.execute('INSERT INTO feedback (user_id, content) VALUES (?,?)', [userId, content])
            if (feedback) {
                return {code: 200, message: 'Feedback submitted successfully'}
            } else {
                return {code: 500, message: 'Something went wrong'}
            }
        } catch (error) {
            return { code: 500, message: 'system error occured', more_info: error }
        }
    }
}

module.exports = new Feedback()