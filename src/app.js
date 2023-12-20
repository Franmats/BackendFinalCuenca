//Librerias y Frameworks
import express from "express"
import MongoStore from "connect-mongo"
import cookieParser from "cookie-parser"
import passport from "passport"
import {Server} from "socket.io"
import config from "./config/config.js"
import cors from "cors"
import session from "express-session"

//Rutas
import productsprueba from "./routes/products.prueba.js"
import cartview from "./routes/cart.view.js"
import userRouter from "./routes/users.router.js"
import ticketRouter from "./routes/ticket.prueba.js"
import productView from "./routes/productsview.router.js"
import checkout from "./routes/payments.router.js"
/* import routerViews from "./routes/views.router.js"
import routerProducts from "./routes/products.route.js"
import routerCart from "./routes/cart.router.js"
import sessionRouter from "./routes/session.router.js"
import viewsRouter from "./routes/views.router.js"
 */
//Logicas
import { ProductManager } from "./DAO/fileManager/ProductManager.js"
import __dirname from "./utils.js"
import initializePassport from "./config/passport.config.js"


const app = express()
app.use(cors({credentials: true,origin:"https://front-of-backend-cuenca.vercel.app",methods:["GET","POST","PUT","DELETE"],allowedHeaders: ['Content-Type', 'Authorization']}))

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: true,
        httpOnly: false,
        domain: 'front-of-backend-cuenca.vercel.app', 
        maxAge: 3600000, 
    }
}))

//sockets y Http
/* const httpServer = app.listen(8080, () => console.log("Listening....."))
const io = new Server(httpServer) */



//Multer
app.use("/static",express.static(__dirname + "/public"))
//Rutas Principales

app.use("/prueba",productsprueba)
app.use("/api/cart",cartview)
app.use("/api/session",userRouter)
app.use("/api/tickets",ticketRouter)
app.use("/api/checkout",checkout)
app.use("/api/products",productView)

//Apertura de Servidor
app.listen(config.port,()=>{console.log("listen")})

//Config de passport
initializePassport()
app.use(passport.initialize())



