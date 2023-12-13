import orderModel from "./models/orders.model.js";

export default class Order {

    getOrders = async()=> {return await orderModel.find()}

    createOrder = async(json) => {return await orderModel.create(json)}

    getOrderByMail = async(email) => {return await orderModel.findOne({purchaser:email})}

}