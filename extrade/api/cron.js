const CronJob = require('cron').CronJob;
const logger = require("../controller/helpers/logger");
const { getPlanById } = require("../controller/helpers/plans");
const { editUserById, getUserById } = require("../controller/helpers/user");
const { getSegmented } = require("../controller/helpers/duration");
const { processWithdrawal } = require("../controller/helpers/withdrawal");
const { calculatePercentage } = require("../controller/helpers/calculation");
const { completeInvestmentHistoryByUserId, insertIntoEarningHistory } = require("../controller/helpers/history");
const earningTextDetails = require("../controller/helpers/textDetails");
const db = require("../models/db");

// This function will be called by external cron service (e.g., cron-job.org)
module.exports = async (req, res) => {
    try {
        // Verify the request is from authorized source
        const authHeader = req.headers.authorization;
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Get all active users
        const [data] = await db.promise().query("SELECT * FROM f_users WHERE investment_status = 'active'");
        
        for (const dt of data) {
            const plan = await getPlanById(dt.investment_plan_id);
            
            if (dt.investment_track < plan.plan_duration) {
                // Get Daily ROI Percentage
                let dailyROI = ((calculatePercentage(plan.plan_roi, plan.plan_price)) + (plan.plan_price)) / plan.plan_duration;
                
                await editUserById(dt.uid, {
                    investment_track: parseInt(dt.investment_track) + 1,
                    roi_balance: dt.roi_balance + dailyROI,
                    total_balance: dt.total_balance + dailyROI
                });

                // Insert Into Earning History
                await insertIntoEarningHistory({
                    amount: dailyROI,
                    details: earningTextDetails.text.roi,
                    user_id: dt.uid
                });
            }

            if (dt.investment_track === plan.plan_duration) {
                await processWithdrawal({
                    withdrawal_user_id: dt.uid,
                    withdrawal_amount: dt.total_balance,
                    withdrawal_status: 0
                });

                // Terminate Investment
                await editUserById(dt.uid, {
                    investment_status: "Not Running",
                    investment_track: 0
                });

                await completeInvestmentHistoryByUserId(dt.uid);
            }
        }

        res.status(200).json({ success: true, message: 'Cron job executed successfully' });
    } catch (error) {
        logger.debug(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}; 