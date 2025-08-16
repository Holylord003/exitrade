const asyncHandler = require("../../../helpers/asyncHandler");
const { saveWebsiteSettings } = require("../../../helpers/settings");

exports.adminWebSettingsGet = asyncHandler(async (req, res, next) => {
    res.render("admin/pages/settings/websettings", {
        title: "Web Settings"
    })
});


exports.adminWebSettingsPost = asyncHandler(async (req, res, next) => {
    await saveWebsiteSettings(req.body);
    return res.json({status:true,message:"Settings Updated Successfully"})
})

exports.adminWebSettingsImagePut = asyncHandler(async (req, res, next) => {
    let type = { [req.query.type]: req.file.buffer };
    await saveWebsiteSettings(type)
    return res.json({ status: true, message: "Settings Updated Successfully" })

});


//PAYMENT SETTINGS
exports.adminPaymentSettingsGet = asyncHandler(async (req, res, next) => {
    res.render("admin/pages/settings/paymentSettings", {
        title: "Payment Settings"
    })
});

exports.adminPaymentSettingsPost = asyncHandler(async (req, res, next) => {
    await saveWebsiteSettings(req.body);
    return res.json({status:true,message:"Payment Settings Updated Successfully"})
});



//<!------CODE INSERTER ---->
exports.adminCodeInserterGet = asyncHandler(async (req, res, next) => {
    res.render("admin/pages/settings/codeInserter", {
        title: "Code Inserter"
    })
});