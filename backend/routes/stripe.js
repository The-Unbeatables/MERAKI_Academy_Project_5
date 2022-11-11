// const express = require("express");
// const Stripe = require("stripe");

// require("dotenv").config();

// const stripe = Stripe(process.env.STRIPE_KEY);

// const stripeRouter = express.Router();

// stripeRouter.post('/create-checkout-session', async (req, res) => {
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           price_data: {
//             currency: 'usd',
//             product_data: {
//               name: 'T-shirt',
//             },
//             unit_amount: 2000,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: 'payment',
//       success_url: `${process.env.CLIENT_URL}/checkout-success`,
//       cancel_url: `${process.env.CLIENT_URL}/cart`,
//     });
  
//     res.send({url: session.url});
//   });

//   module.exports = stripeRouter;

const express = require("express");
const { paymentCheckout } = require("../controllers/payment");

const paymentRouter = express.Router();

paymentRouter.post("/create-checkout-session", paymentCheckout);

module.exports = paymentRouter;