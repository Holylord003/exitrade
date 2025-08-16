const asyncHandler = require("../../../helpers/asyncHandler");
const { dateToPostFormat } = require("../../../helpers/manipulateDate");
const { getNextOffset, paginateData } = require("../../../helpers/pagination");
const { getMembersFunc, deleteUserById, editUserById } = require("../../../helpers/user");

exports.membersGet = asyncHandler(async (req, res, next) => {
    const limit = parseInt(req.query.limit) || parseInt(process.env.LIMIT);
    const currentPage = parseInt(req.query.page) || 1
    const search = req.query.search;
    const status = req.query.status;
    let pageLink;

    const members = await getMembersFunc(search, status, limit, getNextOffset(currentPage, limit))
    
    await members.map(mb => {
        mb.created_at = dateToPostFormat(mb.created_at);
        mb.roi_balance = mb.roi_balance.toLocaleString()
        mb.referral_balance = mb.referral_balance.toLocaleString()
        mb.total_balance = mb.total_balance.toLocaleString()
    });

    //Pagination
    const membersList = await getMembersFunc(search, status, 9999999999, 0);
    
    

    const pageData = paginateData(limit, membersList.length)

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

    if (search) {
        pageLink = `/admin/members?search=${search}&`
    } else if (status) {
        pageLink = `/admin/members?status=${status}&`
    } else {
        pageLink = `/admin/members?`
    }

    res.render("admin/pages/member/membersList", {
        title: "Members",
        members,
        nextBtn,
        prevBtn,
        pageLink
    })

});

//EDIT MEMBER
exports.membersPut = asyncHandler(async (req, res, next) => {

    //Fix Total Balance
    req.body.total_balance = parseInt(req.body.roi_balance) + parseInt(req.body.referral_balance);

    await editUserById(req.body.uid, req.body);
    
    //Response To User
    return res.json({status:true,message:"User Edited Successfully"})
})

//DELETE MEMBER
exports.membersDelete = asyncHandler(async (req, res, next) => {
    await deleteUserById(req.body.id);
    return res.json({status:true,message:"User Deleted Successfully"})
})