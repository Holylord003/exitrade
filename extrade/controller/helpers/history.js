const db = require("../models/db")

//INSERT INTO EARNING HISTORY
exports.insertIntoEarningHistory = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_earning_history SET ?", obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}


//GET EARNINGS WITHDRAWAL HISTORY
exports.getUserEarningsHistory = (userId,limit,offset) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_earning_history WHERE user_id = ? ORDER BY id DESC LIMIT ? OFFSET ?",[parseInt(userId),limit,offset], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}


//GET USER WITHDRAWAL HISTORY
exports.getUserWithdrawalsHistory = (userId,limit,offset) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_withdrawal WHERE withdrawal_user_id = ? ORDER BY withdrawal_id DESC LIMIT ? OFFSET ?",[parseInt(userId),limit,offset], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}


//GET USER REFERRAL HISTORY
exports.getUserReferralHistory = (userId, limit, offset) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_referral A JOIN f_users B ON B.uid = A.referree_id AND A.referrer_id = ? LIMIT ? OFFSET ?", [parseInt(userId), limit, offset], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}


//<!-------------INVESTMENT HISTORY-------------->

//INSERT INTO INVESTMENT HISTORY
exports.insertIntoInvestmentHistory = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_investment_history SET ?", obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//EDIT INVESTMENT HISTORY BY USER ID
exports.completeInvestmentHistoryByUserId = (userId) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_investment_history SET inv_status = 0 WHERE inv_user_id = ?", parseInt(userId), (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}
