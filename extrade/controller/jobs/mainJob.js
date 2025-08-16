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


//This JOB RUN EVERY 12 oclock (0 0 * * *)
let job = new CronJob('0 0 * * *', function() {
    
    //First Get All Active User
    db.query("SELECT * FROM f_users WHERE investment_status = 'active'", async (err, data) => {
        if (err) logger.debug(err)
        else {
            
            //Work Start Here
            await data.map(async dt => {
                
                const plan = await getPlanById(dt.investment_plan_id);
                
                if (dt.investment_track < plan.plan_duration) {
                    
                    
                    //Get Daily ROI Percentage
                    let dailyROI = ((calculatePercentage(plan.plan_roi, plan.plan_price)) + (plan.plan_price)) / plan.plan_duration;
                    
                    await editUserById(dt.uid, {
                        investment_track: parseInt(dt.investment_track) + 1,
                        roi_balance: dt.roi_balance + dailyROI,
                        total_balance: dt.total_balance + dailyROI
                    });

                    //Insert Into Earning History
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

                    //Terminate Investment
                    await editUserById(dt.uid, {
                        investment_status: "Not Running",
                        investment_track: 0
                    });

                    await completeInvestmentHistoryByUserId(dt.uid)
                    
                }
                
            })
            //Work End Here

        }
    });

    job.stop();

    job.start()
    
}, null, false, "Africa/Lagos");




 job.start()