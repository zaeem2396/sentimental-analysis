const { con } = require('../config/db')
class Auth {
    async register(name, email, password) {
        try {
            const [checkIfUserExist, _] = await con.execute('SELECT email FROM user WHERE email = ?', [email])
            if (checkIfUserExist.length > 0) {
                return { code: 409, message: 'user already exist' }
            } else {
                const [createUser, _] = await con.execute('INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, password, 'customer'])
                if (createUser) {
                    return { code: 200, message: 'user created successfully' }
                }
            }
        } catch (error) {
            throw error
            // return { status: 500, message: 'system error occured', more_info: error }
        }
    }
}

module.exports = new Auth()