const fetch = require("node-fetch");

exports.getAllBank = (secretKey) => {
    return new Promise((resolve, reject) => {
        
        fetch("https://api.paystack.co/bank", {
        method: "GET",
        headers: {
            Authorization: `Bearer ${secretKey}`
        }
    }).then(response => response.json())
    .then(response => resolve(response.data))
    .catch(err => reject(err));
        
    })
}