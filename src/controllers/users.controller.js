import { generateToken,authToken } from "../utils.js";
import { usersService } from "../DAO/repository/index.js";
//REGISTRO

export const registerJWT = async(req,res)=> {
    res.json({ status: 'success' })
}

export const loginJWT = async(req,res) => {
    if (!req.user) {
        return res.status(400).json({ error: 'Invalid credentials' })
    }

    const token = generateToken(req.user)
    console.log(token);
    res.cookie('coderCookie', token, {
        httpOnly: false, maxAge: 3600000, sameSite: 'None', secure: true
    }).send({message: 'Logged In!'})//change secure:true for https or secure:false for http in local produccion


}
//ACCESO AL PERFIL

export const accessProfile = async(req,res)=> {
    console.log("aaaaaa",req.user);
    res.json({
        user: req.user.user
    })

}

//CURRENT

export const current = async(req,res)=> {
    res.json({
        user: req.user
    })
}

export const logOut = async(req,res)=> {
    req.session.destroy(error => {
        if (error) {
          console.error('Error al cerrar sesión:', err)
        } else {
          console.log("Sesion cerrada")
          res.redirect('/')//HOME
        }
      })
}

//AUTENTICACION CON GITHUB

export const emptyReqRes= async(req,res)=> {

}

export const githubcallback= async(req,res)=> {
    console.log("Callback: ",req.user)
    req.session.user = req.user
    console.log(req.session)
    res.redirect("http://localhost:8080/api/session/profile")
}

//Middleware para bloqueo de ingreso a DB 

export const authUser = async(req,res,next)=> {
    const user = req.session.user
    console.log("aa",user);
    if(user.email =="adminCoder@coder.com"){
        next()
    }else{res.send("Not Autorized, you r not admin ")}
}

//Enviar datos al front con dto current 

export const currentDTO = async(req,res)=>{
    const user = req.session.user
    const result = usersService.current(user)
    res.send({status:"success",payload:result})
}













