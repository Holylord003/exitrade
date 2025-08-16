const asyncHandler = require("../../../controller/helpers/asyncHandler");
const { getAllBank } = require("../../../controller/helpers/bankVerification");
const { openToken } = require("../../../controller/helpers/jwt");
const { getWebSettings } = require("../../../controller/helpers/settings");
const { getUserWallets, createNewWallet, editWallet } = require("../../../controller/helpers/wallet");
const fetch = require("node-fetch");

exports.paymentWalletGet = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
    const { website_paystack_secret } = await getWebSettings();

    const banks = await getAllBank(website_paystack_secret)

    const wallets = await getUserWallets(id);

    res.render("user/pages/settings/walletSetting", {
        title: "Wallet",
        wallets: wallets[0],
        banks
    })

});


//CREATE NEW WALLET
exports.paymentWalletPost = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
    
    const { website_paystack_secret } = await getWebSettings();
    
    fetch(`https://api.paystack.co/bank/resolve?account_number=${req.body.number}&bank_code=${req.body.code}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${website_paystack_secret}`
        }
    }).then(response => response.json())
        .then(async response => {
            if (response.status) {
                const bank = await getAllBank(website_paystack_secret);
        
            const myBank = bank.find(i => i.code === req.body.code);
            

            //Create Bank Wallet
            await createNewWallet({
                wallet_user_id: id,
                wallet_bank_type: myBank.name,
                wallet_bank_name: response.data.account_name,
                wallet_bank_number: response.data.account_number
            });
            
            //Response To User
            return res.json({ status: true, message: "Wallet Created Successfully" })
            
            } else {
                res.json(response)
            }

            
    }).catch(err => res.json(err))
    
    

});

//EDIT USER WALLET
exports.paymentWalletPut = asyncHandler(async (req, res, next) => {
    const { id } = await openToken(req.signedCookies[process.env.TOKEN_NAME]);
    
    const { website_paystack_secret } = await getWebSettings();
    
    fetch(`https://api.paystack.co/bank/resolve?account_number=${req.body.number}&bank_code=${req.body.code}`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${website_paystack_secret}`
        }
    }).then(response => response.json())
        .then(async response => {
            if (response.status) {
                const bank = await getAllBank(website_paystack_secret);
        
            const myBank = bank.find(i => i.code === req.body.code);
            

            //Update Wallet
            await editWallet(id,{
                wallet_bank_type: myBank.name,
                wallet_bank_name: response.data.account_name,
                wallet_bank_number: response.data.account_number
            });
            
            //Response To User
            return res.json({ status: true, message: "Wallet Edited Successfully" })
            
            } else {
                res.json(response)
            }

            
    }).catch(err => res.json(err))
    

    
  

})