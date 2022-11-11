const stripe = require("stripe")(process.env.STRIPE_KEY);

const paymentCheckout = async (req, res) => {
    const cart = req.body;
  
    const line_items = cart.map((product) => {
      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: product.title,
            images: [product.image],
            description: product.description,
          },
          unit_amount: Math.ceil(product.price * 100),
        },
        quantity: 1,
      };
    });
  
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_URL}/cart`,
    });
  
    res.json({ url: session.url });
  };
  
  module.exports = { paymentCheckout };