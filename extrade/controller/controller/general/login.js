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
    
    const isEmail = validator.isEmail(req.body.credentials);
    let user;

    if (isEmail) {
       user = await getUserByEmail(req.body.credentials)
    } else {
        user = await getUserByUsername(req.body.credentials)
    }

    //If User With The Credential Above Was Found
    if (user) {
        
        //Compare Password
        const isSamePassword = await comparePassword(req.body.password, user.password);
        if (isSamePassword) {
            //Sign In Token
            const token =  await signToken({ id: user.uid,role:"member" });

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