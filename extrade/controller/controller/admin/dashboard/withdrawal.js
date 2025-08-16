const { paymentMailer } = require("../../../email/mails/payment");
const asyncHandler = require("../../../helpers/asyncHandler");
const { dateToPostFormat } = require("../../../helpers/manipulateDate");
const { getNextOffset } = require("../../../helpers/pagination");
const { dataToCsv } = require("../../../helpers/toCsv");
const { getUserById, editUserById } = require("../../../helpers/user");
const { adminGetPendingWithdrawal, updateWithdrawal, deleteWithdrawal, adminGetPaidWithdrawal, getWithdrawalById, getWithdrawalForExportById } = require("../../../helpers/withdrawal");

//PENDING WITHDRAWAL
exports.adminWithdrawalGet = asyncHandler(async (req, res, next) => {
    
    const limit = parseInt(req.query.limit) || parseInt(process.env.LIMIT);
    const currentPage = parseInt(req.query.page) || 1
    
    const pending = await adminGetPendingWithdrawal(limit, getNextOffset(currentPage));
    
    await pending.map(async pd => {
        pd.withdrawal_created = dateToPostFormat(pd.withdrawal_created)
    });

    let nextBtn = null;
    let prevBtn = null;
    if (!req.query.page || req.query.page <= 1) {
        nextBtn = 2;
    } else if (req.query.page > 1) {
        prevBtn = parseInt(req.query.page) - 1;
        nextBtn = parseInt(req.query.page) + 1
    };

    res.render("admin/pages/withdrawal/pending", {
        title: "Pending Withdrawal",
        pending,
        nextBtn,
        prevBtn
    })

    
    
});


//PAID WITHDRAWAL
exports.adminWithdrawalPost = asyncHandler(async (req, res, next) => {
    
    //Check The Type
    if (req.body.type === "mark_all") {
        
        await req.body.data.forEach(async w => {
            const withdrawal = await getWithdrawalById(w.id);
            
            //Get Total Amount (Referral + ROI)
            /* const amountHas = parseInt(withdrawal.roi_balance) + parseInt(withdrawal.referral_balance); */

            const amountLeft = withdrawal.total_balance - parseInt(withdrawal.withdrawal_amount);

            await editUserById(withdrawal.uid, {
                roi_balance: amountLeft,
                total_balance: amountLeft,
                referral_balance: 0,
                investment_capital: 0
            });

            //Update WIthdrawal Log
            await updateWithdrawal(w.id)
            
            //Send Mail
            /* paymentMailer(user); */
            
        });
        
        //Response To Client
        return res.json({ status: true, message: "You have successfully paid marked investors request" })
    }

    //Pay Individually
    else {
        //Update User Amount
    const withdrawal = await getWithdrawalById(req.body.withdrawalId);

    const amountLeft = withdrawal.total_balance - parseInt(withdrawal.withdrawal_amount);
    

    await editUserById(withdrawal.uid, {
        roi_balance: amountLeft,
        total_balance: amountLeft,
        referral_balance: 0,
        investment_capital: 0
    });

    //Update WIthdrawal Log
    await updateWithdrawal(req.body.withdrawalId)

    //Send Mail
    /* paymentMailer(user); */

    //Response To Client
    return res.json({ status: true, message: "You have successfully paid this investor request" })
    }
    
});


//DELETE WITHDRAWAL
exports.adminWithdrawalDelete = asyncHandler(async (req, res, next) => {

    //Check The Type
    if (req.body.type === "mark_all") {
        await req.body.data.forEach(async w => {
            //Delete WIthdrawal Log
            await deleteWithdrawal(w.id)
        });

        //Response To Client
        return res.json({ status: true, message: "You have successfully delete marked investors request" });

     } else {
        //Delete WIthdrawal Log
        await deleteWithdrawal(req.query.id)
        
        //Response To Client
        return res.json({ status: true, message: "You have successfully delete this investor request" });

    }
    
});

//DELETE WITHDRAWAL
exports.adminWithdrawalExport = asyncHandler(async (req, res, next) => {
    let data = []
    await req.body.data.forEach(async w => {
        data.push(w)
    });
console.log(data)
    await dataToCsv(data,"pending")
    res.download("./pending.csv")
})

//PAID WITHDRAWAL (GET)
exports.adminPaidWithdrawalGet = asyncHandler(async (req, res, next) => {
    
    const limit = parseInt(req.query.limit) || parseInt(process.env.LIMIT);
    const currentPage = parseInt(req.query.page) || 1
    
    const paid = await adminGetPaidWithdrawal(limit, getNextOffset(currentPage));
    
    await paid.map(async pd => {
        pd.withdrawal_created = dateToPostFormat(pd.withdrawal_created)
    });

    let nextBtn = null;
    let prevBtn = null;
    if (!req.query.page || req.query.page <= 1) {
        nextBtn = 2;
    } else if (req.query.page > 1) {
        prevBtn = parseInt(req.query.page) - 1;
        nextBtn = parseInt(req.query.page) + 1
    };

    res.render("admin/pages/withdrawal/paid", {
        title: "Paid Withdrawal",
        paid,
        nextBtn,
        prevBtn
    })

    
});