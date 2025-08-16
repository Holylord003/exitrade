const mysql = require("mysql2");
const logger = require("../helpers/logger");
const db = mysql.createPool({
    connectionLimit : 100,
    host     : 'azure.mysql.sovial.com',
    user     : 'root',
    password : 'demo',
    database: 'brands',
    charset: "utf8mb4"
});

db.getConnection((err,data) => {
    if (err) {
        logger.debug(err)
        return console.log(err)
    }
    
    
})


module.exports = db