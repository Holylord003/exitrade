const asyncHandler = require("../../../controller/helpers/asyncHandler");
const validator = require("validator");
const { signToken } = require("../../../controller/helpers/jwt");

exports.adminLoginGet = asyncHandler(async (req, res, next) => {
    
    res.render("admin/pages/auth/login", {
        title: "Admin Login"
    })
})

exports.adminLoginPost = asyncHandler(async (req, res, next) => {
    
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
        // For now, reject all other attempts since we don't have a database
        user = null;
    }

    //If User With The Credential Above Was Found
    if (user) {
        //Sign In Token
        const token = await signToken({ id: user.uid, role: user.role });

        res.cookie(process.env.TOKEN_NAME, token, { signed: true, maxAge: 1000 * 60 * 60 * 24 * 7 })
        
        //Respond To Client
        res.json({status:true,message:"Successfully Login",goto:"/admin/dashboard"})
    }
    else {
        return res.send({status:false,message:"Invalid Admin Credentials"})
    }
})