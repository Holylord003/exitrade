const validator = require("validator");
const asyncHandler = require("../../controller/helpers/asyncHandler");
const { signToken } = require("../../controller/helpers/jwt");
const { comparePassword } = require("../../controller/helpers/password");
const { getUserByEmail, getUserByUsername } = require("../../controller/helpers/user");

exports.loginGet = asyncHandler(async (req, res, next) => {
    res.render("user/pages/auth/login", {
        title: "Login",
        showNotice: req.query.success ? true : false
    })
});

//LOGIN (POST)
exports.loginPost = asyncHandler(async (req, res, next) => {
    
    // Temporary test admin credentials for development
    const testAdminCredentials = {
        username: "admin",
        email: "admin@extrade.com",
        password: "admin123",
        role: "admin",
        uid: 1
    };

    const isEmail = validator.isEmail(req.body.credentials);
    let user;

    // Check for test admin credentials first
    if ((req.body.credentials === testAdminCredentials.username || req.body.credentials === testAdminCredentials.email) && 
        req.body.password === testAdminCredentials.password) {
        user = testAdminCredentials;
    } else {
        // Try to get user from database (will fail since no DB)
        try {
            if (isEmail) {
                user = await getUserByEmail(req.body.credentials)
            } else {
                user = await getUserByUsername(req.body.credentials)
            }
        } catch (error) {
            user = null;
        }
    }

    //If User With The Credential Above Was Found
    if (user) {
        
        // For test admin, skip password comparison
        let isSamePassword = true;
        if (user !== testAdminCredentials) {
            isSamePassword = await comparePassword(req.body.password, user.password);
        }

        if (isSamePassword) {
            //Sign In Token
            const token = await signToken({ id: user.uid, role: user.role });

            res.cookie(process.env.TOKEN_NAME, token, { signed: true, maxAge: 1000 * 60 * 60 * 24 * 7 })
            
            //Respond To Client
            if (user.role === "member") {
                res.json({status:true,message:"Successfully Login",goto:"/dashboard"})
            } else {
                res.json({status:true,message:"Successfully Login",goto:"/admin/dashboard"})
            }

        } else {
           return res.send({status:false,message:`Incorrect Password`}) 
        }
    }
    else {
        return res.send({status:false,message:"User Cannot Be Found"})
    }
    


});