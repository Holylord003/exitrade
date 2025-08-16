const getDateDifference = require("../controller/helpers/getDateDifference")
const { openToken } = require("../controller/helpers/jwt")
const logger = require("../controller/helpers/logger")
const { getUserById } = require("../controller/helpers/user")

const db = require("../models/db")


exports.isAuthUser = async(req, res, next) => {
    if (req.signedCookies[process.env.TOKEN_NAME]) {
        const { role } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
        
        if (role === "member") {
            res.redirect("/dashboard")
        } else {
            res.redirect("/admin/dashboard")
        }
        
    } else {
        next()
    }
    
}

exports.isUserLogin = async (req, res, next) => {
    if (req.signedCookies[process.env.TOKEN_NAME]) {
        next()
    } else {
        res.redirect("/login")
    }
    
};

exports.isRoleAllow = (role) => async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
    const user = await getUserById(id);

    if (role instanceof Array) {
        const check = role.some(rl => rl.toLowerCase() === user.role.toLowerCase());
        if (check) {
            next()
        } else {
            res.send("Not Allowed")
        }
    }else{
        if (user.role.toLowerCase() === role.toLowerCase()) {
       next() 
    } else {
        res.send("Not Allowed")
    }
    }
    
}

/* exports.isAdmin = async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
    db.query("SELECT role FROM users WHERE uid = ? AND role = 'admin' LIMIT 1", id, (err, role) => {
        if (err) {
            console.log(err)
            logger.debug(err)
        } else {
            if (role.length > 0) {
                next()
            } else {
                res.render("error/notFound", {
        title: "Forbidden",
        status: "401",
        heading: "You Are Forbidden To Enter This Page",
        text:"Oops!, you are not allow to enter this page"
    })
            }
        }
    })
    
}

exports.isPremium = async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
    
    //Check If Is On Premium Plan
    db.query("SELECT membership_expired FROM users WHERE uid = ? LIMIT 1", id, (err, planID) => {
        if (err) {
            console.log(err)
            logger.debug(err)
        } else {
            const expiredTime = getDateDifference(planID[0].membership_expired)
            if (expiredTime <= 0) {
                res.render("error/notFound", {
        title: "Upgrade Required",
        status: "426",
        heading: "Upgrade Required",
        text:"Sorry, this page is only available for Premium member!",
        button:{
            text: "Upgrade",
            link: "/user/upgrade"
        }
        
    })
            } else {
                next()
            }
            
        }
    })

}


exports.isPremiumUserJson = async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
    
    //Check If Is On Premium Plan
    db.query("SELECT membership_expired FROM all_users WHERE uid = ? LIMIT 1", id, (err, planID) => {
        if (err) {
            console.log(err)
            logger.debug(err)
        } else {
            const expiredTime = getDateDifference(planID[0].membership_expired)
            
            if (expiredTime <= 0) {
                res.json({status:false,message:"Upgrade To Use This Service"})
            } else {
                next()
            }
            
        }
    })

}



exports.isRoleAllow = (role) => async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
    const user = await getUserById(id);

    if (role instanceof Array) {
        const check = role.some(rl => rl.toLowerCase() === user.role.toLowerCase());
        if (check) {
            next()
        } else {
            res.render("error/error", {
        title: "Not Allowed",
        text: "You are not allow to enter this page",
        button: {
            link: "/",
            text:"Back To Homepage"
        }
        
    })
        }
    }else{
        if (user.role.toLowerCase() === role.toLowerCase()) {
       next() 
    } else {
        res.render("error/error", {
        title: "Not Allowed",
        text: "You are not allow to enter this page",
        button: {
            link: "/",
            text:"Back To Homepage"
        }
        
    })
    }
    }
    
}
exports.isTypeAllow = (role) => async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
    const {reg_type} = await getUserById(id);

    if (role instanceof Array) {
        const check = role.some(rl => rl === reg_type);
        if (check) {
            next()
        } else {
            res.render("error/error", {
        title: "Not Allowed",
        text: "You are not allow to enter this page",
        button: {
            link: "/",
            text:"Back To Homepage"
        }
        
    })
        }
    }else{
        if (reg_type === role) {
       next() 
    } else {
        res.render("error/error", {
        title: "Not Allowed",
        text: "You are not allow to enter this page",
        button: {
            link: "/",
            text:"Back To Homepage"
        }
        
    })
    }
    }
    
} */