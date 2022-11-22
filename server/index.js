const app = require('express')();
const path = require('path');
const Razorpay = require("razorpay");
const cors = require("cors");
app.use(cors());

const random = Math.round(Math.random() * 1000000);

const instance = new Razorpay({
  key_id: "rzp_test_27c5sxy15ExbIz",
  key_secret: "IxFfqqhKOl88RLEGssrhiLPQ",
});

app.get('/', (req, res) => {
    res.json({
        status: "Success!!"
    })
})

app.get('/razorpay', (req, res) => {
    res.send("working")
})

app.post('/razorpay', async (req, res) => {
    const amount = 500
    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: random,
    //   partial_payment: false,
    //   notes: {
    //     key1: "value3",
    //     key2: "value2",
    //   },
    };

    try {
        const response = await instance.orders.create(options);
        console.log(response)
        res.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount
        });   
    } catch (error) {
        console.log(error)
        res.send({status: 'Failure'});   
    }
    
})


app.listen(1337, () => {
    console.log('Listening on 1337....');
})