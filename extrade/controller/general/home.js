const { contactUsMailer } = require("../../email/mails/contact");
const asyncHandler = require("../../helpers/asyncHandler");
const formatNumber = require("../../helpers/formatNumber");
const { getPageBySlug } = require("../../helpers/page");
const { getAllPlans } = require("../../helpers/plans");
const { getTotalMembersCount, getTotalActiveMembersCount } = require("../../helpers/user");
const { getWithdrawalSum } = require("../../helpers/withdrawal");

exports.homeGet = asyncHandler(async (req, res, next) => {
    
    let users = await getTotalMembersCount();
    let activeUsers = await getTotalActiveMembersCount();
    let withdrawalSum = await getWithdrawalSum(1)

    users = formatNumber(users);
    activeUsers = formatNumber(activeUsers);
    withdrawalSum = formatNumber(withdrawalSum);

    

    res.render("home/pages/home", {
        title: "Welcome",
        
        users,
        activeUsers,
        withdrawalSum
    })
});

//VIEW PAGE
exports.pageGet = asyncHandler(async (req, res, next) => {
    const page = await getPageBySlug(req.params.slug);

    if (!page) {
        return res.redirect(301, "/")
    };

    res.render("home/pages/page", {
        title: page.page_title,
        page
    })
});


exports.contactUsGet = asyncHandler(async (req, res, next) => {
    res.render("home/pages/contact", {
        title: "Contact Us/FeedBack Us"
    })
})



exports.contactUsPost = asyncHandler(async (req, res, next) => {
    req.body.date = new Date().toUTCString();
    
    contactUsMailer(req.body);

    return res.json({ status: true, message: "You've sent us a message, we will reply soon!" })
});


exports.planGet = asyncHandler(async (req, res, next) => {
    const plans = await getAllPlans();

    res.render("home/pages/plans", {
        title: "Our Investment Plans",
        plans
    })
})