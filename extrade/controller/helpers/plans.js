const db = require("../models/db");

//GEt ALl Plans
exports.getAllPlans = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_plans WHERE plan_status = 1", (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//GET PLANS BY ID
exports.getPlanById = (planId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_plans WHERE id = ? LIMIT 1",parseInt(planId), (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
}

exports.setupNewPlans = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_orders SET ?",obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

exports.editSetupNewPlans = (id,obj) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_orders SET ? WHERE order_id = ?",[obj,parseInt(id)], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//CHeck Pending Plan
exports.userHasPlan_ = (userId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_orders WHERE order_user_id = ? AND order_status = 0",parseInt(userId), (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//CREATE PLAN
exports.createNewPlan = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_plans SET ?",obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//CREATE PLAN
exports.editPlanById = (planId,obj) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_plans SET ? WHERE id = ?",[obj,parseInt(planId)], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//DELETE PLAN
exports.deletePlanById = (planId) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM f_plans WHERE id = ?",parseInt(planId), (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}
 
//CREATE PLAN
exports.listPlan = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_plans", (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}