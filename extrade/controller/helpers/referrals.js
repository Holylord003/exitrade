const db = require("../models/db");
const { calculatePercentage } = require("./calculation");
const { insertIntoEarningHistory } = require("./history");
const { getPlanById } = require("./plans");
const earningTextDetails = require("./textDetails");
const { editUserById, getUserById } = require("./user");

//Insert Into Referral Table
exports.insertIntoReferralTable = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO f_referral SET ?",obj, (err, data) => {
            if (err) reject()
            else resolve(data)
        })
    })
}

//Get Referral Details By ReferreId
exports.getReferralDetailsByReferreId = (refereeId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_referral WHERE status = 0 AND referree_id = ?", parseInt(refereeId), (err, data) => {
            if (err) reject(err)
            else resolve(data[0])
        })
    })
}

//DELETE REFERRAL
exports.deleteReferralById = (id) => {
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM f_referral WHERE id = ?", parseInt(id), (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}

//DELETE REFERRAL
exports.editReferralById = (id,obj) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_referral SET ? WHERE id = ?", [obj,parseInt(id)], (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}
//Approve Referral
exports.approveReferral = (refereeId,order_plan_id) => {
    return new Promise( async (resolve, reject) => {
        const referral = await this.getReferralDetailsByReferreId(refereeId);
        
        if (referral) {
            const { plan_referral,plan_price } = await getPlanById(order_plan_id);
            const percentageEarn = calculatePercentage(plan_referral,plan_price);

            //Now Get The Referrer Info, And Update Him
            const user = await getUserById(referral.referrer_id)
            if (user) {
                await editUserById(user.uid, {
                referral_balance: user.referral_balance + percentageEarn,
                total_balance: percentageEarn + user.total_balance
                });

                //Insert Into Earning History
                await insertIntoEarningHistory({
                    amount: percentageEarn,
                    details: earningTextDetails.text.referral,
                    user_id: referral.referrer_id
                });
                
                //Edit Referral
                await this.editReferralById(referral.id, {
                    amount: percentageEarn,
                    status: 1
                });
                
                /* //Now Delete The Referral
                await this.deleteReferralById(referral.id); */
                //Response Back
                return resolve()
            }
            return resolve()

        }
        
        return resolve()

    })
}