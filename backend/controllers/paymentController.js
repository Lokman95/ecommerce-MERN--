const tryCatchAsyncErrors = require("../middleware/tryCatchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SEC_KEY);

exports.processPayment = tryCatchAsyncErrors(async (req, res, next) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "usd",
    metadata: {
      company: "Evaly",
    },
  });
  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});

exports.sendStripeApiKey = tryCatchAsyncErrors(async (req, res, next) => {
  res.status(200).json({
    stripeApiKey: process.env.STRIPE_API_KEY,
  });
});
