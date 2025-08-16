const asyncHandler = require("../../../helpers/asyncHandler");
const { openToken } = require("../../../helpers/jwt");
const { hashPassword, comparePassword } = require("../../../helpers/password");
const { getUserById, editUserById } = require("../../../helpers/user");

exports.basicSettingsGet = asyncHandler(async (req, res, next) => {
    res.render("user/pages/settings/basic", {
        title: "Basic Settings"
    })
})

//Basic Settings (POST)
exports.basicSettingsPut = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
    
    if (req.body.password) {
        //FIrst Compare The Password
        const { password } = await getUserById(id);
        const isSamePassword = await comparePassword(req.body.oldPassword, password);
        if (isSamePassword) {
            
            //Hash The New Password
            const obj = {
                password: await hashPassword(req.body.password)
            };

            //Update Password
            await editUserById(id, obj);
            return res.json({ status: true, message: "Password Changed" });
            
        } else {
            return res.json({status:false,message:"Incorrect Old Password"})
        }
    } else {
        const obj = {
            email: req.body.email,
            fullname: req.body.fullname
        }
        await editUserById(id, obj);
        return res.json({status:true,message:"Changes Saved"})
    }
})