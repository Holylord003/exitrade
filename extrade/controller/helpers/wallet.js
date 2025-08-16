const db = require("../models/db")

exports.getUserWallets = (userId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_wallets WHERE wallet_user_id = ?", parseInt(userId), (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//CREATE WALLET
exports.createNewWallet = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_wallets SET ?", obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
};

//EDIT WALLET
exports.editWallet = (userId,obj) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_wallets SET ? WHERE wallet_user_id = ?", [obj,parseInt(userId)], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

