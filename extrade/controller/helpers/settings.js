const db = require("../models/db");
const blobToBase64 = require("./blobToBase64");



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


exports.saveWebsiteSettings = (obj) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE f_website_settings SET ?", obj, (err, data) => {
            if (err) reject(err)
            else resolve(data)
        })
    })
}