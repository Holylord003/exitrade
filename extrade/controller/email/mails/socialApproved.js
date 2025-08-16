const transporter = require("../transporter");
const ejs = require("ejs")
const path = require("path");
const logger = require("../../controller/helpers/logger");
const { getWebsiteSettings } = require("../../controller/helpers/getSomeInfo");

exports.socialApproved = async (email) => {

    //GET Site Email
    const {website_title, website_email} = await getWebsiteSettings()
    //Get The Template
    const html = await ejs.renderFile(path.join(process.cwd(),"email","templates","sApproved.ejs"));

    const mailOptions = {
    from: `${website_title} <${website_email}>`,
    to: email,
    subject: 'Your Social Media Followers Campaign Has Been Approved!',
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
