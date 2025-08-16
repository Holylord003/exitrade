const transporter = require("../transporter");
const ejs = require("ejs")
const path = require("path");
const logger = require("../../controller/helpers/logger");
const { getWebsiteSettings } = require("../../controller/helpers/getSomeInfo");

exports.youtubeDeclined = async (email,reason) => {

    //GET Site Email
    const {website_title, website_email} = await getWebsiteSettings()
    //Get The Template
    const html = await ejs.renderFile(path.join(process.cwd(),"email","templates","yDeclined.ejs"),{reason});

    const mailOptions = {
    from: `${website_title} <${website_email}>`,
    to: email,
    subject: 'Your Youtube Campaign Got Disapproved!',
    html
    };

    transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
            console.log(err)
            logger.debug(err)
        } else {
            console.log(result)
        }
    })

    
}
