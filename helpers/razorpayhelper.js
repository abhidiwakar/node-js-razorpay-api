const fetch = require("node-fetch")


const generateOrderId = async (rzpId, rzpSecret, amount, merchantOrderId, callback) => {
    fetch("https://api.razorpay.com/v1/orders", {
        method: "post",
        body: JSON.stringify({
            amount: amount * 100,
            currency: "INR",
            receipt: merchantOrderId,
            notes: {
                merchant_order_id: merchantOrderId,
            }
        }),
        headers: {
            'Authorization': `Basic ${Buffer.from(rzpId + ":" + rzpSecret).toString("base64")}`,
            'Content-Type': 'application/json'
        }
    }).then(data => {
        data.json().then(formattedJson => {
            callback(null, formattedJson)
        }).catch(error => {
            callback(error, null)
        })
    }).catch(err => {
        callback(err, null)
    })
}




module.exports = generateOrderId