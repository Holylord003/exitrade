const asyncHandler = require("../../../helpers/asyncHandler");
const blobToBase64 = require("../../../helpers/blobToBase64");
const { dateToPostFormat } = require("../../../helpers/manipulateDate");
const { getAllPendingOrders, editOrderById, getOrderById, deleteOrderById, getAllOrders } = require("../../../helpers/orders");
const { getNextOffset, paginateData } = require("../../../helpers/pagination");
const { approveReferral } = require("../../../helpers/referrals");
const { editUserById } = require("../../../helpers/user");

exports.adminOrdersGet = asyncHandler(async (req, res, next) => {
    
    const limit = parseInt(req.query.limit) || parseInt(process.env.LIMIT);
    const currentPage = parseInt(req.query.page) || 1
    
    
    const orders = await getAllOrders(limit, getNextOffset(currentPage));
    
    await orders.map(async od => {
        if (od.order_proof) {
            od.order_proof = await blobToBase64(od.order_proof)
        };
        od.order_created = dateToPostFormat(od.order_created);
        od.order_end = dateToPostFormat(new Date(Date.parse(od.order_created) + 1000 * 60 * 60 * 24 * od.plan_duration));
    });

    const pageList = await getAllOrders(9999999999, 0);
    const pageData = paginateData(limit, pageList.length);

    let nextBtn = null;
    let prevBtn = null;
    
    //Prev
    if (currentPage > 1) {
        prevBtn = currentPage - 1;
    }

    //Next
    if (currentPage !== "" && pageData[pageData.length - 1] > currentPage) {
        nextBtn = currentPage + 1
    };

    res.render("admin/pages/orders/orderList", {
        title: "Investment Orders",
        orders,
        nextBtn,
        prevBtn
    })
})

//APPROVE ORDER (POST)
exports.adminOrdersPost = asyncHandler(async (req, res, next) => {
    
    const order = await getOrderById(req.body.order_id)
    //First Change Order Status
    await editOrderById(req.body.order_id, {
        order_status: 1
    });

    //Edit User Infos
    await editUserById(order.order_user_id, {
        investment_plan_id: order.order_plan_id,
        investment_status: "active",
        investment_track: 0
    })

    //Set Referrals
    await approveReferral(order.order_user_id, order.order_plan_id);
    
    //Response To Client
    return res.json({status:true,message:"Order Approved Successfully"})
})


//DELETE ORDER (DELETE)
exports.adminOrdersDelete = asyncHandler(async (req, res, next) => {
    
    //Delete Order
    await deleteOrderById(req.query.id)

    //Response To Client
    return res.json({status:true,message:"Order Deleted Successfully"})
})