const asyncHandler = require("../../../helpers/asyncHandler");
const { getUserWithdrawalsHistory } = require("../../../helpers/history");
const { openToken } = require("../../../helpers/jwt");
const { dateToPostFormat } = require("../../../helpers/manipulateDate");
const { getNextOffset, paginateData } = require("../../../helpers/pagination");


exports.withdrawalHistoryGet = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
    const currentPage = parseInt(req.query.page) || 1;
    const limit = parseInt(process.env.LIMIT);


    const history = await getUserWithdrawalsHistory(id, limit, getNextOffset(currentPage, limit));
    
    history.map(ht => {
        ht.withdrawal_created = dateToPostFormat(ht.withdrawal_created)
    });

    const pageData = await getUserWithdrawalsHistory(id, 999999999, 0);
    
    const paginationArr = paginateData(limit,pageData.length)

    res.render("user/pages/history/withdrawalHistory", {
        title: "Withdrawal History",
        history,
        paginationArr,
        currentPage
    })
})