const db = require("../models/db")

exports.generateCoupons = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_coupon_keys SET ?", obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })

}

exports.adminListCouponFunc = (search,amount,status,limit,offset) => {
    return new Promise((resolve, reject) => {
        let query;
        if (search) {
            query = `SELECT * FROM f_coupon_keys A JOIN f_users B ON B.uid = A.coupon_author AND coupon_code LIKE '%${search}%' LIMIT ${limit} OFFSET ${offset}`
        } else if (amount) {
            query = `SELECT * FROM f_coupon_keys A JOIN f_users B ON B.uid = A.coupon_author AND coupon_amount = ${amount} LIMIT ${limit} OFFSET ${offset}`
        } else if (status) {
            query = `SELECT * FROM f_coupon_keys A JOIN f_users B ON B.uid = A.coupon_author AND coupon_status = ${status} LIMIT ${limit} OFFSET ${offset}`
        } else {
            query = `SELECT * FROM f_coupon_keys A JOIN f_users B ON B.uid = A.coupon_author LIMIT ${limit} OFFSET ${offset}`
        }

        db.query(query, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })

}


//GET COUPON BY NAME
exports.getCouponByName = (name) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_coupon_keys WHERE coupon_code = ? LIMIT 1", name, (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })

}

//USE COUPON BY ID
exports.useCouponById = (couponCode,usedUser) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_coupon_keys SET coupon_status = 1, coupon_used_by = ? WHERE coupon_code = ? ", [usedUser,couponCode], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })

}