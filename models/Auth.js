const { con } = require('../config/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const m = require('../utils/message')

class Auth {
    async register(name, email, password) {
        try {
            const [checkIfUserExist, _] = await con.execute('SELECT email FROM user WHERE email = ?', [email])
            if (checkIfUserExist.length > 0) {
                return { code: 409, message: m.user.user_exist }
            } else {
                const hashPassword = await bcrypt.hash(password, 10)
                const [createUser, _] = await con.execute('INSERT INTO user (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, hashPassword, 'customer'])
                if (createUser) {
                    return { code: 200, message: m.user.user_created }
                }
            }
        } catch (error) {
            // throw error
            return { status: 500, message: m.default.system_error, more_info: error }
        }
    }

    async login(email, password) {
        try {
            const [checkIfUserExist, _] = await con.execute('SELECT * FROM user WHERE email = ?', [email])
            if (checkIfUserExist.length > 0) {
                const checkPassword = await bcrypt.compare(password, checkIfUserExist[0].password)
                if (checkPassword) {
                    delete checkIfUserExist[0].password
                    return { code: 200, message: m.user.login_successful, data: checkIfUserExist[0], access_token: this.generateToken(checkIfUserExist[0]) }
                } else {
                    return { code: 401, message: m.user.password_incorrect }
                }
            } else {
                return { code: 404, message: m.user.user_not_found }
            }
        } catch (error) {
            return { code: 500, message: m.default.system_error, more_info: error }
        }
    }

    async profile(id) {
        try {
            const [checkIfUserExist, _] = await con.execute('SELECT * FROM user WHERE id = ?', [id])
            if (checkIfUserExist.length > 0) {
                delete checkIfUserExist[0].password
                return { code: 200, message: 'success', data: checkIfUserExist[0] }
            } else {
                return { code: 404, message: m.user.user_not_found }
            }
        } catch (error) {
            return { code: 500, message: m.default.system_error, more_info: error }
        }
    }

    async update(id, name, email, password) {
        try {
            const [checkIfUserExist, _] = await con.execute('SELECT * FROM user WHERE id = ?', [id])
            if (checkIfUserExist.length > 0) {
                const hashPassword = await bcrypt.hash(password, 10)
                const [updateUser, _] = await con.execute('UPDATE user SET name = ?, email = ?, password = ? WHERE id = ?', [name, email, hashPassword, id])
                if (updateUser) {
                    return { code: 200, message: 'user updated successfully' }
                }
            } else {
                return { code: 404, message: m.user.user_not_found }
            }
        } catch (error) {
            return { code: 500, message: m.default.system_error, more_info: error }
        }
    }

    generateToken = (authUser) => {
        return jwt.sign(authUser, process.env.JWT_SECRET, { expiresIn: '1h' });
    }
}

module.exports = new Auth()