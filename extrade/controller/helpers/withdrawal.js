const db = require("../models/db")

exports.processWithdrawal = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_withdrawal SET ?", obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}


//GET PENDING WITHDRAWALS
exports.adminGetPendingWithdrawal = (limit, offset) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_withdrawal A JOIN f_users B ON A.withdrawal_user_id = B.uid AND withdrawal_status = 0 LEFT JOIN f_wallets C ON C.wallet_user_id = B.uid LIMIT ? OFFSET ?", [limit, offset], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

//GET PENDING WITHDRAWALS
exports.adminGetPaidWithdrawal = (limit,offset) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_withdrawal A JOIN f_users B ON A.withdrawal_user_id = B.uid AND withdrawal_status = 1 LIMIT ? OFFSET ?", [limit,offset], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}


//PAID USER
exports.updateWithdrawal = (withdrawal_id) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_withdrawal SET withdrawal_status = 1 WHERE withdrawal_id = ?", parseInt(withdrawal_id), (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//DELETE USER
exports.deleteWithdrawal = (withdrawal_id) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM f_withdrawal WHERE withdrawal_id = ?", parseInt(withdrawal_id), (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//GET TOTAL PAID WITHDRAWAL
//1 = Paid WIthdrawa
//2 = Unpaid Withdrawal
exports.getWithdrawalSum = (type) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT SUM(withdrawal_amount) as total_sum FROM f_withdrawal WHERE withdrawal_status = ?", type, (err, data) => {
            if (err) reject(err)
            else resolve(data[0].total_sum)
        })
    })
}


//GET WITHDRAWAL BY ID
exports.getWithdrawalById = (withdrawal_id) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_withdrawal A JOIN f_users B ON A.withdrawal_user_id = B.uid AND A.withdrawal_id = ? LIMIT 1", parseInt(withdrawal_id), (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
}

//GET WITHDRAWAL BY ID
exports.getWithdrawalForExportById = (withdrawal_id) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_withdrawal A JOIN f_users B ON A.withdrawal_user_id = B.uid AND A.withdrawal_id = ? LEFT JOIN f_wallets C ON C.wallet_user_id = B.uid LIMIT 1", parseInt(withdrawal_id), (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
}