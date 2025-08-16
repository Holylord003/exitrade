const asyncHandler = require("../../../controller/helpers/asyncHandler");
const { openToken } = require("../../../controller/helpers/jwt");
const { getUserById } = require("../../../controller/helpers/user");

//LOGOUT
exports.logoutController = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
    
    const { role } = await getUserById(id);

    //Clear Cookies
    res.clearCookie(process.env.TOKEN_NAME);
    
    if (role === "admin") {
        return res.redirect("/admin/login")
    } else {
        return res.redirect("/login")
    }
}
)