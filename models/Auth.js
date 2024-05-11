const { con } = require('../config/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class Auth {
    async register(name, email, password) {
        try {
            const [checkIfUserExist, _] = await con.execute('SELECT email FROM user WHERE email = ?', [email])
            if (checkIfUserExist.length > 0) {
                return { code: 409, message: 'user already exist' }
            } else {
                const hashPassword = await bcrypt.hash(password, 10)
                const [createUser, _] = await con.execute('INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, hashPassword, 'customer'])
                if (createUser) {
                    return { code: 200, message: 'user created successfully' }
                }
            }
        } catch (error) {
            // throw error
            return { status: 500, message: 'system error occured', more_info: error }
        }
    }

    async login(email, password) {
        try {
            const [checkIfUserExist, _] = await con.execute('SELECT * FROM user WHERE email = ?', [email])
            if (checkIfUserExist.length > 0) {
                const checkPassword = await bcrypt.compare(password, checkIfUserExist[0].password)
                if (checkPassword) {
                    delete checkIfUserExist[0].password
                    return { code: 200, message: 'login successful', data: checkIfUserExist[0], access_token: this.generateToken(checkIfUserExist[0]) }
                } else {
                    return { code: 401, message: 'password is incorrect' }
                }
            } else {
                return { code: 404, message: 'user not found' }
            }
        } catch (error) {
            return { code: 500, message: 'system error occured', more_info: error }
        }
    }

    async profile(id) {
        try {
            const [checkIfUserExist, _] = await con.execute('SELECT * FROM user WHERE id = ?', [id])
            if (checkIfUserExist.length > 0) {
                delete checkIfUserExist[0].password
                return { code: 200, message: 'success', data: checkIfUserExist[0] }
            } else {
                return { code: 404, message: 'user not found' }
            }
        } catch (error) {
            // throw error
            return { code: 500, message: 'system error occured', more_info: error }
        }
    }

    generateToken = (authUser) => {
        return jwt.sign(authUser, process.env.JWT_SECRET, { expiresIn: '1h' });
    }
}

module.exports = new Auth()