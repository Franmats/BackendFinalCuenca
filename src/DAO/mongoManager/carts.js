import CartModel from "./models/cart.model.js"

export default class Cart {

    getCarts = async () => { return await CartModel.find()/* .populate("products.product") */}

    createCart = async (a) => {return await CartModel.create(a)}

    getCartByID = async (cid) => {
      
      const result = await CartModel.findOne({_id:cid}).populate("products.pid").lean().exec();
      return result
    }

    putProductInCart = async (result) => {

      const cid =result.cid
      const pid = result.pid
      const qua = parseInt(result.qua)

        try {
          
          const find = await CartModel.findOne({_id:cid}).populate("products.pid")
          const a = await find.products.some(prod => prod.pid._id == pid)
          console.log(a)
          if ( a ) {
            const index = await find.products.findIndex( product => product.pid._id == pid )
            find.products[index].quantity = qua
            await find.save()
            console.log("Cantidad actualizada");
          }else {
            const carrito =  await CartModel.findById(cid)
            const newProduct = {cid,pid,quantity:qua}
            carrito.products.push(newProduct)
            console.log("Producto en el carrito");

            carrito.save()
          }
        } catch (error) {
          console.log(error)
        }
    } //Colocar un producto en un determinado carrito

    deleteProductCartByID = async (cid,pid) => {
        try{
            const carrito =  await CartModel.findById(cid)
            const modificacion = carrito.products.filter(e => e.pid._id != pid)
            console.log(modificacion);
            let resultado = await CartModel.updateOne({_id : cid},{$set:{products : modificacion}})
            resultado
      
          }catch {
            console.log("Error al eliminar el Producto del Carrito ")
          }
    }

    updateQuantityOfProductInCart = async (cid,pid,nuevaCant) => {


        try{
          let resultado = await CartModel.updateOne({_id : cid ,"products.id": pid},{ $set: { "products.$.quantity": nuevaCant}} )
          resultado
            
          }catch{
          console.log("Error al Actualizar carrito")
        }
    }

    deleteProductsInCart = async (cid) => {
        try{

            let resultado = await CartModel.updateOne({_id : cid},{products : []})
            resultado
        
          }catch {
            console.log("Error al vaciar carrito ")
          }
    } 
    
    getCartDetailsForView = async (cid) =>  {
      try {
        const result = await CartModel.findOne({_id:cid}).populate("products.pid").lean().exec();
        return result
    } catch (error) {
        console.log(error);   
    }
    }

    updateTotalPrice = async (cid) => {
      try {
        const carrito =  await CartModel.findById(cid).populate("products.pid").lean().exec();
        const updateTotalPrice = (carrito)=>{
          // Using the reduce method to sum the prices
            const total = carrito.products.reduce((accumulator, product) => {  
            return accumulator + product.pid.precio * product.quantity
              }, 0) // The second parameter of reduce is the initial value of the accumulator
            return total
        }

        const totalPrice = updateTotalPrice(carrito)
        console.log(totalPrice);
        if(!isNaN(totalPrice)){
          //Busca el carrito y actualiza el totalPrice
          const resultado = await CartModel.updateOne({_id : cid},{total : totalPrice})
          resultado
          console.log("Success")
        } else {
          const resultado = await CartModel.updateOne({_id : cid},{total : 0})
          resultado
          console.log("Success 2 ")
        }

      } catch (error) {

        console.log("error en carts.js",error)
        
      }
    }



}

//Clase que contiene los metodos de interacion con la base de datos 