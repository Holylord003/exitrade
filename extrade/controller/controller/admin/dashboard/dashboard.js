const asyncHandler = require("../../../controller/helpers/asyncHandler");
const formatNumber = require("../../../controller/helpers/formatNumber");
const { getTotalMembersCount, getTotalActiveMembersCount } = require("../../../controller/helpers/user");
const { getWithdrawalSum, adminGetPendingWithdrawal } = require("../../../controller/helpers/withdrawal");
const { getAllActiveOrdersCount, getAllActiveOrders } = require("../../../controller/helpers/orders");
const { dateToPostFormat } = require("../../../controller/helpers/manipulateDate");

exports.adminDashboardGet = asyncHandler(async (req, res, next) => {

    let totalMembers = await getTotalMembersCount();
    let totalActiveMembers = await getTotalActiveMembersCount();
    let totalPaid = await getWithdrawalSum(1);
    let totalUnpaid = await getWithdrawalSum(0);
    let totalActiveOrders = await getAllActiveOrdersCount();
    let totalActiveOrdersList = await getAllActiveOrders(20,0);
    let pendingWithdrawal = await adminGetPendingWithdrawal(20, 0);
    
    await pendingWithdrawal.map(pw => {
        pw.withdrawal_created = dateToPostFormat(pw.withdrawal_created)
    });
    await totalActiveOrdersList.map(tp => {
        tp.order_created = dateToPostFormat(tp.order_created);
        tp.order_end = dateToPostFormat(new Date(Date.parse(tp.order_created) + 1000 * 60 * 60 * 24 * tp.plan_duration));
    });

    
    totalMembers = formatNumber(totalMembers);
    totalActiveMembers = formatNumber(totalActiveMembers);
    totalPaid = formatNumber(totalPaid);
    totalUnpaid = formatNumber(totalUnpaid);

    res.render("admin/pages/dashboard", {
        title: "Admin Dashboard",
        totalMembers,
        totalActiveMembers,
        totalPaid,
        totalUnpaid,
        totalActiveOrders,
        totalActiveOrdersList,
        pendingWithdrawal
    })
})