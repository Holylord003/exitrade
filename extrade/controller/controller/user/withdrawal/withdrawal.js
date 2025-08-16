const asyncHandler = require("../../../controller/helpers/asyncHandler");

exports.userWithdrawalGet = asyncHandler(async (req, res, next) => {
    res.render("user/pages/withdrawal/withdrawal", {
        title: "Withdrawal"
    })
})