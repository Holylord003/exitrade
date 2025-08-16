const { adminLoginGet } = require("../../controller/admin/auth/login");
const { couponListGet, adminGenerateCouponControllerPost } = require("../../controller/admin/dashboard/coupon");
const { adminDashboardGet } = require("../../controller/admin/dashboard/dashboard");
const { membersGet, membersDelete, membersPut } = require("../../controller/admin/dashboard/member");
const { adminOrdersGet, adminOrdersPost, adminOrdersDelete } = require("../../controller/admin/dashboard/orders");
const { adminNewPageGet, adminNewPagePost, adminGetAllPages, getPageForEditGet, adminEditPagePut, adminDeletePageDelete } = require("../../controller/admin/dashboard/page");
const { adminListPlans, adminAddNewPlan, adminAddNewPlanGet, adminEditNewPlan, admindeletePlan } = require("../../controller/admin/dashboard/plans");
const { adminWebSettingsGet, adminWebSettingsPost, adminWebSettingsImagePut , adminPaymentSettingsGet, adminPaymentSettingsPost, adminCodeInserterGet} = require("../../controller/admin/dashboard/settings");
const { adminWithdrawalGet, adminWithdrawalPost, adminWithdrawalDelete, adminPaidWithdrawalGet, adminWithdrawalExport } = require("../../controller/admin/dashboard/withdrawal");
const { loginPost } = require("../../controller/general/login");
const { isRoleAllow, isUserLogin, isAuthUser } = require("../../middleware/isAuth");
const { uploadPostImage } = require("../../multer/multerMiddleware");

const adminRoute = require("express").Router();


adminRoute.route("/dashboard").get(adminDashboardGet)

adminRoute.route("/plans").get(adminListPlans).put(adminEditNewPlan).delete(admindeletePlan)

//ADD NEW PLAN
adminRoute.route("/plans/new").get(adminAddNewPlanGet).post(adminAddNewPlan);

//INVESTMENT ORDER
adminRoute.route("/orders").get(adminOrdersGet).post(adminOrdersPost).delete(adminOrdersDelete);

//PENDING WITHDRAWAL 
adminRoute.route("/withdrawal/pending").get(adminWithdrawalGet).post(adminPaymentSettingsPost);

//PAID WITHDRAWAL 
adminRoute.route("/withdrawal/paid").get(adminPaidWithdrawalGet)

//PAID PENDING WITHDRAWAL (MAKE PAYMENT & DELETE PAYMENT)
adminRoute.route("/withdrawal/pending/paid").post(adminWithdrawalPost).delete(adminWithdrawalDelete)

//EXPORT PENDING WITHDRAWAL
adminRoute.route("/withdrawal/pending/export").post(adminWithdrawalExport)


//WEB SETTINGS
adminRoute.route("/settings/websettings").get(adminWebSettingsGet).post(adminWebSettingsPost).put(uploadPostImage.single("image"),adminWebSettingsImagePut)

//PAYMENT SETTINGS
adminRoute.route("/settings/payment").get(adminPaymentSettingsGet).post(adminPaymentSettingsPost)


//PAGES
adminRoute.route("/page/new").get(adminNewPageGet).post(adminNewPagePost)

//ALL PAGES
adminRoute.route("/page").get(adminGetAllPages).post(adminNewPagePost).delete(adminDeletePageDelete)

//EDIT PAGE
adminRoute.route("/page/edit/:id").get(getPageForEditGet).put(adminEditPagePut)

//CODE INSERTER
adminRoute.route("/settings/inserter").get(adminCodeInserterGet);

//COUPON
adminRoute.route("/coupon").get(couponListGet).post(adminGenerateCouponControllerPost);

//MEMBERS
adminRoute.route("/members").get(membersGet).put(membersPut).delete(membersDelete);

module.exports = adminRoute