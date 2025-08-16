// const asyncHandler = require("../../../controller/helpers/asyncHandler");
// const formatNumber = require("../../../controller/helpers/formatNumber");
// const { getTotalMembersCount, getTotalActiveMembersCount } = require("../../../controller/helpers/user");
// const { getWithdrawalSum, adminGetPendingWithdrawal } = require("../../../controller/helpers/withdrawal");
// const { getAllActiveOrdersCount, getAllActiveOrders } = require("../../../controller/helpers/orders");
// const { dateToPostFormat } = require("../../../controller/helpers/manipulateDate");

exports.adminDashboardGet = async (req, res, next) => {

    // Mock data for now since database is not connected
    let totalMembers = "1,234";
    let totalActiveMembers = "567";
    let totalPaid = "89,012";
    let totalUnpaid = "12,345";
    let totalActiveOrders = "89";
    let totalActiveOrdersList = [
        {
            order_id: "ORD001",
            username: "demo_user",
            plan_name: "Starter Plan",
            order_amount: "$500",
            order_created: "2024-01-15",
            order_end: "2024-02-15"
        }
    ];
    let pendingWithdrawal = [
        {
            withdrawal_id: "WD001",
            username: "demo_user",
            withdrawal_amount: "$100",
            withdrawal_created: "2024-01-15"
        }
    ];

    res.render("admin/pages/dashboard", {
        title: "Admin Dashboard",
        totalMembers,
        totalActiveMembers,
        totalPaid,
        totalUnpaid,
        totalActiveOrders,
        totalActiveOrdersList,
        pendingWithdrawal
    });
};