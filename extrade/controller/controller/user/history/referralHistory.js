const asyncHandler = require("../../../controller/helpers/asyncHandler");
const { openToken } = require("../../../controller/helpers/jwt");
const { dateToPostFormat } = require("../../../controller/helpers/manipulateDate");
const { getNextOffset, paginateData } = require("../../../controller/helpers/pagination");
const { getUserReferralHistory } = require("../../../controller/helpers/history");


exports.referralHistoryGet = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
    const currentPage = parseInt(req.query.page) || 1;
    const limit = parseInt(process.env.LIMIT);


    const history = await getUserReferralHistory(id, limit, getNextOffset(currentPage, limit));
    
    history.map(ht => {
        ht.referral_created = dateToPostFormat(ht.referral_created)
    });

    
    
    const pageData = await getUserReferralHistory(id, 999999999, 0);
    
    const paginationArr = paginateData(limit,pageData.length)

    res.render("user/pages/history/referralHistory", {
        title: "Referral History",
        history,
        paginationArr,
        currentPage
    })
})