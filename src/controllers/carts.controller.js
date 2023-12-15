import {cartsService} from "../DAO/repository/index.js"

export const getCarts = async (req,res)=> {

    const result = await cartsService.getCarts()
    console.log(result);
    
    res.send({status:"successs", payload:result})
}

export const createCart = async(req,res)=> {
    const result = await cartsService.createCart({products:[]})
    res.send({status:"success", payload:result})
}

export const getCartByID = async(req,res)=> {
    try {
        const cid = req.params.cid
        const result = await cartsService.getCartByID(cid)
        /* console.log(JSON.stringify(result,null,"\t")); */
        res.render("carts",result)
    } catch (error) {
        console.log(error);   
    }
}

export const putProductInCart = async (req,res)=> {
    const cid = req.params.cid
    const pid = req.params.pid
    const qua = req.params.qua
    try {
        await cartsService.putProductInCart(cid,pid,qua)
        res.json({status:"Producto en el carrito"})
    } catch (error) {
        console.log("error",error);
        res.json({status:"Error al colocar el product"})
    }
} 

export const deleteProductCartByID = async (req,res)=> {
    const cid = req.params.cid
    const pid = req.params.pid
    try {
        const result = await cartsService.deleteProductCartByID(cid,pid)
        result
        res.json({status:"Success"})
    } catch (error) {
        console.log(error);
        res.json({status:"Failed"})
    }  
}

export const updateQuantityOfProductInCart = async(req,res) => {
    const cid = req.params.cid
    const pid = req.params.pid
    const qua = req.params.qua

    const result = await cartsService.updateQuantityOfProductInCart(cid,pid,qua)
    result
    res.status(200)
}

export const deleteProductsInCart = async(req,res)=> {
    const cid = req.params.cid
    const result = await cartsService.deleteProductsInCart(cid)
    result
    res.json({status:"Success"})
}

export const getCartDetailsForView = async (req,res)=> {
    const cid = req.params.cid
    const cart = await cartsService.getCartDetailsForView(cid)
   
    console.log("desde controller",cart);
    res.json(cart)
}

export const updateTotalPrice = async(req,res,next) => {
    const cid = req.params.cid
    console.log(cid);
    const result = await cartsService.updateTotalPrice(cid)
    result
    next()
}

//CONTROLLERS 
//Esporta las funciones req y res para ser utilizadas en las rutas. Una accion por funcion.




