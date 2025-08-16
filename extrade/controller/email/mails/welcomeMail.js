const transporter = require("../transporter");
const ejs = require("ejs")
const path = require("path");
const logger = require("../../helpers/logger");
const { getWebsiteSettings } = require("../../helpers/getSomeInfo");

exports.welcomeMailer = async (user) => {

    const { website_email, website_title } = await getWebsiteSettings()
    
    //Get The Template
    const html = await ejs.renderFile(path.join(process.cwd(),"email","templates","welcomemailtemplate.ejs"),{user});

    const mailOptions = {
    from: `${website_title} <${website_email}>`,
    to: user.email,
    subject: 'You Are Highly Welcome',
    html
    };

    transporter.sendMail(mailOptions, (err, result) => {
        if (err) {
            console.log(err)
            logger.debug(err)
        } 
    })

    
}
