const mysql = require('mysql2/promise')
var con = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})
// Function to test database connection
const testDatabaseConnection = async () => {
    try {
        const connection = await pool.getConnection();
        connection.release();
        console.log('Connected to the database successfully!');
        return true; // Connection successful
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
        return false; // Connection failed
    }
};

module.exports = { con, testDatabaseConnection };