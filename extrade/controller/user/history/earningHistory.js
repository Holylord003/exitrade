const asyncHandler = require("../../../controller/helpers/asyncHandler");
const { openToken } = require("../../../controller/helpers/jwt");
const { dateToPostFormat } = require("../../../controller/helpers/manipulateDate");
const { getNextOffset, paginateData } = require("../../../controller/helpers/pagination");
const { getUserEarningsHistory } = require("../../../controller/helpers/history");


exports.earningHistoryGet = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
    const currentPage = parseInt(req.query.page) || 1;
    const limit = parseInt(process.env.LIMIT);


    const history = await getUserEarningsHistory(id, limit, getNextOffset(currentPage, limit));
    
    history.map(ht => {
        ht.earning_created = dateToPostFormat(ht.earning_created)
    });

    const pageData = await getUserEarningsHistory(id, 999999999, 0);
    
    const paginationArr = paginateData(limit,pageData.length)

    res.render("user/pages/history/earningHistory", {
        title: "Earnings History",
        history,
        paginationArr,
        currentPage
    })
})