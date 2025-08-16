const transporter = require("../transporter");
const ejs = require("ejs")
const path = require("path");
const logger = require("../../helpers/logger");
const { getWebSettings } = require("../../helpers/settings");


exports.contactUsMailer = async (obj) => {

    //GET Site Email
    const { website_email } = await getWebSettings();

    //Get The Template
    const html = await ejs.renderFile(path.join(process.cwd(),"email","templates","contact.ejs"),{obj});

    const mailOptions = {
    from: `${obj.name} <${obj.email}>`,
    to: website_email,
    subject: obj.subject,
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
