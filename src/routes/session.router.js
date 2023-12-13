import { Router } from "express";
import passport from "passport";


const router = Router()


//URL para render
router.get("/login", (req, res)=> {
    res.render("login", {})
})
router.get("/register", (req, res) => {

    res.render("register", {})
})

//Iniciar sesion
router.post("/login",passport.authenticate("login","/login"), async (req, res) => {
    if(!req.user) return res.status(400).send("Invalid Credentials")
    req.session.user = req.user
    return res.redirect ("/profile")
})

//Registro
router.post("/register", passport.authenticate("register", {
    failureRedirect:"/register"
}),async (req, res) => {

    res.redirect("/login")
})

//Perfils

function auth (req,res,next) {
    if (req.session?.user) next()
    else res.redirect("/login")
}

router.get("/profile", auth, (req,res) => {
    const user = req.session.user
    
    res.render("profile", user)
})

//Current

router.get("/current",(req,res)=> {
    const user = req.session.user
    res.render("current", user)
})

//Github

router.get("/login-github",passport.authenticate("github", {scope:["user:email"]}),
    async(req,res)=>{}
    )

router.get("/githubcallback",passport.authenticate("github", {failureRedirect:"/"}),
    async(req,res)=> {
        console.log("Callback: ",req.user)
        req.session.user = req.user
        console.log(req.session)
        res.redirect("/api/session/profile")
    }
)
export default router