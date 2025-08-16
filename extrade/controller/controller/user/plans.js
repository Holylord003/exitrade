const asyncHandler = require("../../controller/helpers/asyncHandler");
const { calculatePercentage } = require("../../controller/helpers/calculation");
const { getCouponByName, useCouponById } = require("../../controller/helpers/coupon");
const { insertIntoInvestmentHistory, insertIntoEarningHistory } = require("../../controller/helpers/history");
const { openToken } = require("../../controller/helpers/jwt");
const { deleteAllUserOrderById } = require("../../controller/helpers/orders");
const { getAllPlans, setupNewPlans, editSetupNewPlans, userHasPlan_, getPlanById } = require("../../controller/helpers/plans");
const { approveReferral } = require("../../controller/helpers/referrals");
const { getUserById, editUserById } = require("../../controller/helpers/user");

exports.userGetPlans = asyncHandler(async (req, res, next) => {
    const plans = await getAllPlans();

    res.render("user/pages/plans/plan", {
        title: "Investment Plans",
        plans
    })
})


exports.setupPlanPost = asyncHandler(async (req, res, next) => {
    //First Check The Coupon
    const coupon = await getCouponByName(req.body.coupon);
    if (!coupon) {
        return res.json({ status: false, message: "Coupon not found" })
    }

    if (coupon.coupon_status === 1) {
        return res.json({ status: false, message: "Coupon already used" })
    };
    
    //Get The Plan
    const plan = await getPlanById(req.body.order_plan_id);
    if (!plan) {
        return res.json({ status: false, message: "Coupon not found" })
    }

    if (coupon.coupon_amount >= plan.plan_price) {
        
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);

    //First Check If HAs Pending Plan Or Active One
    const result = await getUserById(id);

    if (result.investment_status === "pending") {
      return res.json({status:false,message:"Sorry, You Already Have A Pending Investment Plan"})  
    } else if (result.investment_status === "active") {
        
        return res.json({ status: false, message: "Sorry, You Already Have An Active Investment Plan" })
    }

    
    //FIrst Delete All Previous Orders
    await deleteAllUserOrderById(id);
    
    //Assign User Order Id
    req.body.order_user_id = id;

    await setupNewPlans({
        order_plan_id: req.body.order_plan_id,
        order_user_id: id,
        order_status:1
    });
        
    //INSERT INTO INVESTMENT HISTORY
    await insertIntoInvestmentHistory({
        inv_plan_name: plan.plan_name,
        inv_user_id: id,
        inv_duration: plan.plan_duration,
        inv_status: 1
    })


    //Set Investment Status To Active ANd Credit Him Total ROI
    
   /*  const totalRoiOfInvestment = calculatePercentage(plan.plan_roi, plan.plan_price) + plan.plan_price; */
    
    await editUserById(id, {
        investment_status: "active",
        investment_capital: plan.plan_price,
        investment_plan_id: req.body.order_plan_id,
        investment_track: 0
    });
        
    //Set Referrals
    await approveReferral(id, req.body.order_plan_id);

    //Turn Coupon To Used
    await useCouponById(req.body.coupon,id);
    
    /* await insertIntoEarningHistory({
            amount: totalRoiOfInvestment,
            details: "You have earn R.O.I for your newly investment plan",
            user_id: id
        }); */
        
        
    return res.json({status:true,message:"You successfully setup a plan, Enjoy!"})
    
    } else {
        return res.json({ status: false, message: "Coupon not suitable for this plan" })
    }
    
    
})


