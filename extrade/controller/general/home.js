const { contactUsMailer } = require("../../controller/email/mails/contact");
const asyncHandler = require("../../controller/helpers/asyncHandler");
const formatNumber = require("../../controller/helpers/formatNumber");
const { getPageBySlug } = require("../../controller/helpers/page");
const { getAllPlans } = require("../../controller/helpers/plans");
const { getTotalMembersCount, getTotalActiveMembersCount } = require("../../controller/helpers/user");
const { getWithdrawalSum } = require("../../controller/helpers/withdrawal");

exports.homeGet = asyncHandler(async (req, res, next) => {
    
    // Mock data for now since database is not connected
    let users = "1,234";
    let activeUsers = "567";
    let withdrawalSum = "89,012";

    res.render("home/pages/home", {
        title: "Welcome",
        
        users,
        activeUsers,
        withdrawalSum
    })
});

//VIEW PAGE
exports.pageGet = asyncHandler(async (req, res, next) => {
    // Mock page data for now
    const page = {
        page_title: req.params.slug.charAt(0).toUpperCase() + req.params.slug.slice(1).replace(/-/g, ' '),
        page_description: `This is the ${req.params.slug} page content.`
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
    // Mock plans data for now
    const plans = [
        {
            plan_name: "Starter Plan",
            plan_min_amount: 100,
            plan_max_amount: 1000,
            plan_duration: 30,
            plan_roi: 15
        },
        {
            plan_name: "Premium Plan", 
            plan_min_amount: 1000,
            plan_max_amount: 10000,
            plan_duration: 60,
            plan_roi: 25
        }
    ];

    res.render("home/pages/plans", {
        title: "Our Investment Plans",
        plans
    })
})