const db = require("../models/db")

//PENDING ORDERS
exports.getAllOrders = (limit,offset) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_orders A JOIN f_plans B ON A.order_plan_id = B.id JOIN f_users C ON C.uid = A.order_user_id LIMIT ? OFFSET ?",[limit,offset], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//PENDING ORDERS
exports.getAllPendingOrders = (limit,offset) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_orders A JOIN f_plans B ON A.order_plan_id = B.id AND A.order_status = 0 JOIN f_users C ON C.uid = A.order_user_id LIMIT ? OFFSET ?",[limit,offset], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//PENDING ORDERS COUNT
exports.getAllPendingOrdersCount = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT COUNT(*) as total FROM f_orders WHERE order_status = 0", (err, data) => {
            if (err) reject(err)
            else resolve(data[0].total)
        })
    })
};

//ACTIVE ORDERS
exports.getAllActiveOrders = (limit,offset) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_orders A JOIN f_plans B ON A.order_plan_id = B.id AND A.order_status = 1 JOIN f_users C ON C.uid = A.order_user_id LIMIT ? OFFSET ?",[limit,offset], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//ACTIVE ORDERS COUNT
exports.getAllActiveOrdersCount = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT COUNT(*) as total FROM f_orders WHERE order_status = 1", (err, data) => {
            if (err) reject(err)
            else resolve(data[0].total)
        })
    })
}

//TOTAL INVESTED AMOUNT SO FAR
exports.getTotalInvestmentSum = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT SUM(withdrawal_amount) as total FROM f_orders WHERE order_status = 1", (err, data) => {
            if (err) reject(err)
            else resolve(data[0].total)
        })
    })
}

exports.getOrderById = (order_id) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_orders WHERE order_id = ? LIMIT 1",parseInt(order_id), (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
}

//EDIT ORDER BY ID
exports.editOrderById = (order_id, obj) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_orders SET ? WHERE order_id = ?", [obj, parseInt(order_id)], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//DELETE ORDER BY ID
exports.deleteOrderById = (order_id) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM f_orders WHERE order_id = ?", parseInt(order_id), (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//DELETE ALL USER ORDERS ORDER BY ID
exports.deleteAllUserOrderById = (userId) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM f_orders WHERE order_user_id = ?", parseInt(userId), (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}