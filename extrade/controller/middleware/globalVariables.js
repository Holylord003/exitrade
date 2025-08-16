
const { openToken } = require("../helpers/jwt");

const { getWebSettings, userinfo } = require("../middleware/generalData");
const db = require("../models/db");


//Global Variable :)
exports.setGlobalVariable = async (req, res, next) => {
    let regex = /(js|images|css)/gi
    if (!regex.test(req.url)) {
       //GET WEB SETTINGS
    req.app.locals.webSettings = await getWebSettings()
    req.app.locals.url = req.protocol + "://" + req.get('host')
  

    //GET USER
    if (req.signedCookies[process.env.TOKEN_NAME]) {
        const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

        req.app.locals.user = await userinfo(id);
        

        } else {
            req.app.locals.user = null
            
           
    }
    
    if(!req.app.locals.user){
            res.clearCookie(process.env.TOKEN_NAME);
        }
        
        
    
    next()
    } else {
        next()
    }
    
   
}

