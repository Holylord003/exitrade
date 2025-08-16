const asyncHandler = require("../../../helpers/asyncHandler");

exports.adminLoginGet = asyncHandler(async (req, res, next) => {
    
    res.render("admin/pages/auth/login", {
        title: "Admin Login"
    })
})