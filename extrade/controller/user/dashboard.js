const asyncHandler = require("../../controller/helpers/asyncHandler");
const { getDurationFunc } = require("../../controller/helpers/duration");
const { getUserReferralHistory } = require("../../controller/helpers/history");
const { openToken } = require("../../controller/helpers/jwt");
const { dateToPostFormat } = require("../../controller/helpers/manipulateDate");
const { getPlanById } = require("../../controller/helpers/plans");
const { getUserById } = require("../../controller/helpers/user");
const { getUserWallets } = require("../../controller/helpers/wallet");

exports.dashboardGet = asyncHandler(async (req, res, next) => {

    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
    
    let plan = {};

    const { investment_plan_id } = await getUserById(id);
    if (investment_plan_id === 0) {
        plan.plan_name = "No Plan",
        plan.plan_duration = "None"
    } else {
        plan = await getPlanById(investment_plan_id);
        plan.plan_duration = dateToPostFormat(getDurationFunc(plan.plan_duration))

    }

    
    
    //Get Wallet
    const wallets = await getUserWallets(id)
    
    //Get Referrals
    const referrals = await getUserReferralHistory(id, 10, 0);
    referrals.map(rf => {
        rf.referral_created = dateToPostFormat(rf.referral_created)
    });
    
    res.render("user/pages/dashboard/dashboard", {
        title: "My Dashboard",
        plan,
        wallets: wallets[0],
        referrals
    })
})