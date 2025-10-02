const razorpay=require("razorpay");

const Razorpay= new razorpay({
    key_id:process.env.REACT_APP_RAZORPAY_KEY_ID,
    key_secret:process.env.REACT_APP_RAZORPAY_KEY_SECRET
})

export default Razorpay