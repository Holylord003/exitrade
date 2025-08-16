const db = require("../models/db")

//GET INVESTMENT
exports.getAllUserInvestmentHistory = (userId,limit,offset) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_investment_history A WHERE A.inv_user_id = ? ORDER BY A.inv_id DESC LIMIT ? OFFSET ?",[parseInt(userId),limit,offset], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

