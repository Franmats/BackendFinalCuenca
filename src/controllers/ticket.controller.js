import { ticketService } from "../DAO/repository/index.js";
import { cartsService } from "../DAO/repository/index.js";
import { usersService } from "../DAO/repository/index.js";
import { productoviewService } from "../DAO/repository/index.js";
import { ordersService } from "../DAO/repository/index.js";
import nodemailer from "nodemailer"




//METODOS DEL ADMIN
export const getTickets = async(req,res)=> {
    const result = await ticketService.getTickets()
    res.send({status:"success",payload: result})
}



//METODOS DEL USER
export const createTicket = async(req,res)=> {
    /* req.body = {
        amount: total price
        purchaser:email of purchser
    } */
    const ticket = req.body
    const deleteProductsCart = async () => {
        try {
            const user = await usersService.getUserByEmail({email:ticket.purchaser})
            console.log(user);
            const cart = await cartsService.getCartByID(user.cart)
            console.log(cart);
            const update = await cart.products.forEach(product => {
                 productoviewService.updateStockProducts(product.pid._id,product.quantity)
    
            })
            console.log(update)
            if(update ==undefined) {
                const deleteCart = await cartsService.deleteProductsInCart(user.cart)
                deleteCart
            }else {
                console.log("Error al eliminar el carrito");
            }


        } catch (error) {
            console.log(error);
        
        }
    }

    const sendEmailConfimation = async(number) => {
        const transport = nodemailer.createTransport({
            service:"gmail",
            port:587,
            auth:{
                user:"shopmailingshop@gmail.com",
                pass:""
            }
        })

        const result = await transport.sendMail({
            from:"shopmailingshop@gmail.com",
            to:"shopmailingshop@gmail.com",
            subject:"Prueba de Mailing",
            html:`
                <div>
                    Gracias por su compra, su numero de pedido: <br> <b>${number}</b>
                
                </div>
            `,
            attachments:[]
        })

        return result

    }

    const createOrder = async (ticket)=> {
        console.log(ticket)
        const user = await usersService.getUserByEmail({email:ticket.purchaser})
        const cart = await cartsService.getCartByID(user.cart)
        const result = await ordersService.createOrder( {
            code: ticket.code,
            email:ticket.purchaser,
            order: cart
        })

        return result
    }
    
    try {
    const result = await ticketService.createTicket(ticket)
       if (result!= undefined){
        await sendEmailConfimation(result.code)
        await createOrder(result)
        await deleteProductsCart()
        res.json(result)
       }else{
        console.log("Error");
       }
           
    
    } catch (error) {
        console.log(error);
    }

   
}