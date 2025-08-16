const asyncHandler = require("../../../helpers/asyncHandler");
const { generateCoupons, adminListCouponFunc } = require("../../../helpers/coupon");
const { openToken } = require("../../../helpers/jwt");
const { getNextOffset, paginateData } = require("../../../helpers/pagination");
const { listPlan } = require("../../../helpers/plans");
const { getWebSettings } = require("../../../helpers/settings");
const { getUniqueID } = require("../../../helpers/uniqueID");


//GET COUPON LIST
exports.couponListGet = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || parseInt(process.env.LIMIT);
    const search = req.query.search
    const amount = parseInt(req.query.amount)
    const status = req.query.status
    

    const coupons = await adminListCouponFunc(search, amount, status, limit, getNextOffset(page, limit));
    
    const plans = await listPlan();
    
    let nextBtn = null;
    let prevBtn = null;

    const couponData = await adminListCouponFunc(search, amount, status, 999999999, 0);
    const pageData = paginateData(limit, couponData.length);

    
    //Prev
    if (page > 1) {
        prevBtn = page - 1;
    }

    //Next
    if (page !== "" && pageData[pageData.length - 1] > page) {
        nextBtn = page + 1
    };

    let link;
    if (search) {
        link = `/admin/coupon?search=${search}&`
    } else if (amount) {
        link = `/admin/coupon?amount=${amount}&`
    } else if (status) {
        link = `/admin/coupon?status=${status}&`
    } else {
        link = `/admin/coupon?`
    }

    return res.render("admin/pages/coupon/couponList", {
        title: "Coupons",
        coupons,
        plans,
        prevBtn,
        nextBtn,
        search,
        amount,
        status,
        link
    })
});



//GENERATE COUPON (POST)
exports.adminGenerateCouponControllerPost = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME])
    //First Get The Discount
    const { website_coupon_prefix } = await getWebSettings();

    
    for (i = 1; i <= parseInt(req.body.quantity); i++){
        await generateCoupons({
                coupon_code: website_coupon_prefix + getUniqueID(),
                coupon_amount: parseInt(req.body.price),
                coupon_author: id
        })
    }

    return res.json({status:true,message:`${req.body.quantity} Coupon(s) Generated Successfully`})
})