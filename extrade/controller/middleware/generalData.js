const blobToBase64 = require("../controller/helpers/blobToBase64")
const getDateDifference = require("../controller/helpers/getDateDifference")
const { openToken } = require("../controller/helpers/jwt")
const manipulateDate = require("../controller/helpers/manipulateDate")
const numberWithDelimeter = require("../controller/helpers/numberWithDelimeter")
const db = require("../models/db")

//GET USER INFO
exports.userinfo =  (userId) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_users WHERE uid = ?", parseInt(userId), async (err, user) => {
            if (err)reject(err)
            else {
                let data = user[0]
                return resolve(data)
            }
        })
    })
}


//Get Web Settings
exports.getWebSettings = () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM f_website_settings LIMIT 1", async (err, data) => {
            if (err) reject(err)
            else {
                const settings = data[0];
                if (settings.website_logo) {
                    settings.website_logo = await blobToBase64(settings.website_logo)
                }
                if (settings.website_favicon) {
                    settings.website_favicon = await blobToBase64(settings.website_favicon)
                };

                resolve(settings)
            }
        })
    })
}