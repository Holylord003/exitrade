const db = require("../models/db");

//EDIT USER track
exports.editUsertrack = () => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_users SET investment_track = investment_track + 1 WHERE investment_status = 'active'", (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//GET USER BY ID
exports.insertUserIntoDb = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_users SET ?", obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//GET USER BY ID
exports.getUserById = (userId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_users WHERE uid = ?", parseInt(userId), (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
}

//GET USER BY Username
exports.getUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_users WHERE username = ?", username, (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
}

//GET USER BY Email
exports.getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_users WHERE email = ?", email, (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
}

//GET USER PLAN
exports.getUserPlan = (userId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_orders WHERE order_user_id = ? LIMIT 1", userId, (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
}


//EDIT USER BY Email
exports.editUserById = (userId,obj) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_users SET ? WHERE uid = ?", [obj,parseInt(userId)], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//DELETE USER BY ID
exports.deleteUserById = (userId) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM f_users WHERE uid = ?", parseInt(userId), (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//GET TOTAL MEMBERS COUNT
exports.getTotalMembersCount = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT COUNT(*) AS total FROM f_users WHERE NOT role = 'admin'", (err, data) => {
            if (err) reject(err)
            else resolve(data[0].total)
        })
    })
}

//GET TOTAL MEMBERS COUNT
exports.getTotalActiveMembersCount = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT COUNT(*) AS active FROM f_users WHERE NOT role = 'admin' AND investment_status = 'active'", (err, data) => {
            if (err) reject(err)
            else resolve(data[0].active)
        })
    })
}


//GET ALL MEMBERS
//GET TOTAL MEMBERS COUNT
exports.getMembersFunc = (search,status,limit,offset) => {
    return new Promise((resolve, reject) => {
        let query;

        if (search) {
            query = `SELECT * FROM f_users WHERE NOT role = 'admin' AND (fullname LIKE '%${search}%' OR username LIKE '%${search}%') LIMIT ${limit} OFFSET ${offset}`
        } else if (status) {
            query = `SELECT * FROM f_users WHERE NOT role = 'admin' AND  (investment_status = '${status}' OR investment_status IS NULL) LIMIT ${limit} OFFSET ${offset}`
        } else {
            query = `SELECT * FROM f_users WHERE NOT role = 'admin' LIMIT ${limit} OFFSET ${offset}`
        }
        db.query(query, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}