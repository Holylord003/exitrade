// const mysql = require("mysql2");
// const logger = require("../controller/helpers/logger");

// const db = mysql.createPool({
//     connectionLimit : 100,
//     host     : process.env.DB_HOST || 'azure.mysql.sovial.com',
//     user     : process.env.DB_USER || 'root',
//     password : process.env.DB_PASSWORD || 'demo',
//     database : process.env.DB_NAME || 'brands',
//     charset: "utf8mb4",
//     ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
// });

// db.getConnection((err,data) => {
//     if (err) {
//         logger.debug(err)
//         return console.log(err)
//     }
//     console.log('Database connected successfully');
// })

// Mock database for development
const db = {
    query: (sql, params, callback) => {
        if (callback) {
            callback(null, []);
        }
        return Promise.resolve([]);
    }
};

module.exports = db