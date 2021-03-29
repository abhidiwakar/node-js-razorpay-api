require('dotenv').config()
const express = require("express")
const cors = require("cors")
const { getProperty, addorder } = require('./helpers/dbhelper')
const generateOrderId = require('./helpers/razorpayhelper')

const app = express()
const serverPort = process.env.PORT || 4000

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (_, res) => {
    res.status(200).json({
        message: "Welcome to the REST API"
    })
})

app.post("/createorder", (req, res) => {
    var orderId = req.body.orderid
    var amount = req.body.amount
    if (orderId != null && amount != null) {
        getProperty("rzp_id", (err, rzp_id) => {
            if (err != null) {
                console.log(err)
                res.status(500).json({ message: "Unable to create order!" })
            } else {
                getProperty("rzp_secret", (secerr, rzp_secret) => {
                    if (secerr != null) {
                        console.log(secerr)
                        res.status(500).json({ message: "Unable to create order!" })
                    } else {
                        generateOrderId(rzp_id, rzp_secret, amount, orderId, (error, response) => {
                            if (error) {
                                console.log(error)
                                res.status(500).json({ message: 'Failed to generate order id! Try again after some time.' })
                            } else {
                                res.status(201).json({ 'rzp_order_id': response.id, 'rzp_id': rzp_id })
                            }
                        })
                    }
                })
            }
        })
    } else {
        console.log(req.body)
        res.status(400).json({ message: "order id or amount is missing from the body!" })
    }
})

app.use((_, res, __) => {
    res.status(404).json({ 'message': 'Looks like your hit the dead end!' });
});

app.listen(serverPort, () => {
    console.log(`Server started at port ${serverPort}`)
})