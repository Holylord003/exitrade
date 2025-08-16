const asyncHandler = require("../../../controller/helpers/asyncHandler");
const { createNewPlan, listPlan, editPlanById, deletePlanById } = require("../../../controller/helpers/plans");

exports.adminListPlans = asyncHandler(async (req, res, next) => {
    const packages = await listPlan();

    res.render("admin/pages/plan/planList", {
        title: "Plans",
        packages
    })
})


//ADD NEW PLAN (GET)
exports.adminAddNewPlanGet = asyncHandler(async (req, res, next) => {
    res.render("admin/pages/plan/addNew", {
        title: "Add New Plan"
    })
})


//ADD NEW PLAN (POST)
exports.adminAddNewPlan = asyncHandler(async (req, res, next) => {
    
    //Insert Plan Into DB
    await createNewPlan(req.body);
    return res.json({ status: true, message: "Plan Created Successfully" })
});


//EDIT PLAN (POST)
exports.adminEditNewPlan = asyncHandler(async (req, res, next) => {
    
    //Edit Plan 
    await editPlanById(req.query.id,req.body);
    return res.json({status:true,message:"Plan Edited Successfully"})
})


//DELETE PLAN (DELETE)
exports.admindeletePlan = asyncHandler(async (req, res, next) => {
    
    //Edit Plan 
    await deletePlanById(req.body.id);
    return res.json({status:true,message:"Plan Deleted Successfully"})
})