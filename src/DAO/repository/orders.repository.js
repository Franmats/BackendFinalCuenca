
export default class OrdersRepository {
    constructor(dao){
        this.dao = dao
    }

    getOrders = async()=> {return await this.dao.getOrders()}

    createOrder = async(json) => {
        
        return await this.dao.createOrder(json)}

    getOrderByMail = async(mail) => {return await this.dao.getOrderByMail(mail)}
}