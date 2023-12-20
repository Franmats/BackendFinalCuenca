import Stripe from "stripe";
import config from "../config/config.js";
const stripe = new Stripe(config.stripeCode)

export const createSession = async (req,res) => {
    const cartId = req.body
    const amount = cartId.cart * 100
    console.log(amount);
    

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                    product_data:{
                        name:"Commerce",
                        description:"commerce"
                    },
                    currency:"usd",
                    unit_amount:amount
                },
                quantity:1

            }
        ],
        mode:"payment",
        success_url:"https://front-of-backend-cuenca.vercel.app/api/tickets",
        cancel_url:"https://front-of-backend-cuenca.vercel.app/api/checkout"
    })

    console.log(session);
    return res.json(session)
}