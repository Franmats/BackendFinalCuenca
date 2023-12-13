import mongoose from "mongoose";

const orderModel = mongoose.model("orders", new mongoose.Schema({
    code: String,
    email:String,
    order:{type: mongoose.Schema.Types.ObjectId, ref: "carts"}
}))



export default orderModel