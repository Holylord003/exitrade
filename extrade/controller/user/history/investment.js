const asyncHandler = require("../../../controller/helpers/asyncHandler");
const { getAllUserInvestmentHistory } = require("../../../controller/helpers/investment");
const { openToken } = require("../../../controller/helpers/jwt");
const { dateToPostFormat } = require("../../../controller/helpers/manipulateDate");
const { getNextOffset, paginateData } = require("../../../controller/helpers/pagination");

exports.investmentHistoryGet = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
    const currentPage = parseInt(req.query.page) || 1;
    const limit = parseInt(process.env.LIMIT);


    const userInvestments = await getAllUserInvestmentHistory(id, limit, getNextOffset(currentPage, limit));
    
    
    userInvestments.map(ui => {
        ui.plan_end_date = dateToPostFormat(new Date(Date.parse(ui.inv_created) + 1000 * 60 * 60 * 24 * ui.inv_duration));
        ui.inv_created = dateToPostFormat(ui.inv_created)
    });

    const pageData = await getAllUserInvestmentHistory(id, 999999999, 0);
    
    const paginationArr = paginateData(limit,pageData.length)

    res.render("user/pages/history/investmentHistory", {
        title: "Investment History",
        userInvestments,
        paginationArr,
        currentPage
    })
})