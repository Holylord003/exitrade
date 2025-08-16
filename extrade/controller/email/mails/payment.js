const transporter = require("../transporter");
const ejs = require("ejs")
const path = require("path");
const logger = require("../../helpers/logger");
const { getWebSettings } = require("../../helpers/settings");


exports.paymentMailer = async (user) => {

    //Get Site Email
    const {website_title, website_email} = await getWebSettings()
    
    //Get The Template
    const html = await ejs.renderFile(path.join(process.cwd(),"email","templates","payment.ejs"),{sitename: website_title});

    const mailOptions = {
    from: `${website_title} <${website_email}>`,
    to: user.email,
    subject: 'Your Payment Just Landed!',
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
