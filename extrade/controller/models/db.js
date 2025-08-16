const mysql = require("mysql2");
const logger = require("../helpers/logger");
const db = mysql.createPool({
    connectionLimit : 100,
    host     : 'localhost',
    user     : 'fizcalbl_new_fixed',
    password : 'iamtheowner',
    database: 'fizcalbl_new_fixed',
    charset: "utf8mb4"
});

db.getConnection((err,data) => {
    if (err) {
        logger.debug(err)
        return console.log(err)
    }
    else {
        
        db.query("SET GLOBAL event_scheduler = OFF;")
        db.query("SET @@GLOBAL.event_scheduler = OFF;")

        
    }
    
    
})


module.exports = db