const asyncHandler = require("../../controller/helpers/asyncHandler");
const { hashPassword } = require("../../controller/helpers/password");
const { insertIntoReferralTable } = require("../../controller/helpers/referrals");
const { getUserById, getUserByUsername, insertUserIntoDb } = require("../../controller/helpers/user");
const allowDatas = require("../../security/allowDatas");

exports.registerGet = asyncHandler(async (req, res, next) => {
    let ref;

    if (req.query.ref) {
        const user = await getUserById(req.query.ref)
        ref = user && user.username
    }
    res.render("user/pages/auth/register", {
        title: "Register",
        ref
    })
})


//REGISTER (POST)
exports.registerPost = asyncHandler(async (req, res, next) => {
    //First FIlter Some Input From The Client
    try {
        req.body = allowDatas(req.body);

    //Check Referral
    let referral = {};

    if (req.body.upline || req.query.ref) {
        
        if (req.body.upline) {
            const rf1 = await getUserByUsername(req.body.upline);
            if(rf1){
                referral.referrer_id = rf1.uid;
            }
        } else if (req.query.id) {
            const rf1 = await getUserById(req.query.ref);
            if(rf1){
                referral.referrer_id = rf1.uid;
            }
        }
    }

    
    //Hash Password
    req.body.password = await hashPassword(req.body.password);

    //Delete Upline From Body
    delete req.body.upline 
    
    //Insert Into Db
    const { insertId } = await insertUserIntoDb(req.body);

    //Set Referree
    if (referral.referrer_id) {
        referral.referree_id = insertId;
        referral.amount = 0
    };

    //Response To User
    res.json({ status: true, message: "Registration Successful", goto: "/login?success=true" });

    //Insert Into Referral
    if (Object.keys(referral).length > 0) {
        insertIntoReferralTable(referral)
    }
    } catch (error) {
        let message;
        if (error.message.includes("email")) {
            message = "Email Already Taken"
        } else if (error.message.includes("username")) {
            message = "Username Already Taken"
        } else {
            message = "Something Went Wrong"
        }
        res.json({status:false,message})
    }

})

//GET UPline By Username
exports.getUplineByUsername = asyncHandler(async (req, res, next) => {
    const user = await getUserByUsername(req.query.username);
    if (user) {
        return res.json({status:true,username:user.username})
    } else {
        return res.json({status:false})
    }
}
)