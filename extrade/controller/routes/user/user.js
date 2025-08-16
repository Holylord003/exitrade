const { dashboardGet } = require("../../controller/user/dashboard");
const { earningHistoryGet } = require("../../controller/user/history/earningHistory");
const { investmentHistoryGet } = require("../../controller/user/history/investment");
const { referralHistoryGet } = require("../../controller/user/history/referralHistory");
const { withdrawalHistoryGet } = require("../../controller/user/history/withdrawalHistory");
const { userGetPlans, setupPlanPost } = require("../../controller/user/plans");
const { basicSettingsGet, basicSettingsPut } = require("../../controller/user/settings/basic");
const { paymentWalletGet, paymentWalletPost, paymentWalletPut } = require("../../controller/user/wallet/payment_wallet");


const userRoute = require("express").Router();

//USER DASHBOARD
userRoute.route("/dashboard").get(dashboardGet)

//PLANS
userRoute.route("/dashboard/plans").get(userGetPlans).post(setupPlanPost)

//INVESTMENT HISTORY
userRoute.route("/dashboard/history/investment").get(investmentHistoryGet);

//EARNING HISTORY
userRoute.route("/dashboard/history/earnings").get(earningHistoryGet);

//WITHDRAWAL HISTORY
userRoute.route("/dashboard/history/withdrawal").get(withdrawalHistoryGet);

//REFERRAL HISTORY
userRoute.route("/dashboard/history/referral").get(referralHistoryGet);

//PAYMENT WALLET
userRoute.route("/dashboard/settings/wallet").get(paymentWalletGet).post(paymentWalletPost).put(paymentWalletPut);

//USER SETTINGS
userRoute.route("/dashboard/settings/basic").get(basicSettingsGet).put(basicSettingsPut);
module.exports = userRoute