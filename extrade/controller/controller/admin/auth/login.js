const asyncHandler = require("../../../controller/helpers/asyncHandler");

exports.adminLoginGet = asyncHandler(async (req, res, next) => {
    
    res.render("admin/pages/auth/login", {
        title: "Admin Login"
    })
})