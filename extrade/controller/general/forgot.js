const validator = require("validator");
const { resetPasswordMailer } = require("../../email/mails/resetPasswordMail");
const asyncHandler = require("../../helpers/asyncHandler");
const { signToken, signResetPasswordToken, openToken } = require("../../helpers/jwt");
const { comparePassword, hashPassword } = require("../../helpers/password");
const { getUserByEmail, getUserByUsername, editUserById } = require("../../helpers/user");

exports.forgotGet = asyncHandler(async (req, res, next) => {


    res.render("user/pages/auth/forgotPassword/step1", {
        title: "Reset Password"
    })
});

//REQUEST FOR TOKEN
exports.forgotPost = asyncHandler(async (req, res, next) => {
    
    const isEmail = validator.isEmail(req.body.credentials);
    let user;

    if (isEmail) {
       user = await getUserByEmail(req.body.credentials)
    } else {
        user = await getUserByUsername(req.body.credentials)
    }

    //If User With The Credential Above Was Found
    
    if (!user) {
        return res.json({status:false,message:"User Not Found"})
    }
    

    const token = await signResetPasswordToken({ id: user.uid });
    
    //Send Reset Password Mailer
    resetPasswordMailer(user, token)

    return res.json({status:true,message:"Good Job, Check your email for next step"})
});

exports.changePasswordGet = asyncHandler(async (req, res, next) => {

    //Get The Token
    let token;

    try {
        token = await openToken(req.query.token);
        
        res.render("user/pages/auth/forgotPassword/step2", {
        title: "Change Password"
    });

    } catch (error) {
        return res.render("user/pages/error/error", {
            title: "Something Went Wrong",
            text: error.message,
            button: {
                link: "#",
                text:""
            }
        })
    }

    
});

exports.changePasswordPut = asyncHandler(async (req, res, next) => {

    //Get The Token
    let token;

    try {
        token = await openToken(req.query.token);
        
        req.body.password = await hashPassword(req.body.password);

        await editUserById(token.id, {
            password: req.body.password
        });
        
        return res.json({ status: true, message: "Password Changed Successfully" ,goto:"/login"})
        
    } catch (error) {
        return res.render("user/pages/error/error", {
            title: "Something Went Wrong",
            text: error.message,
            button: {
                link: "#",
                text:""
            }
        })
    }

    
});