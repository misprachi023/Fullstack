const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const cookieParser = require("cookie-parser")

const { connection } = require("./db");
const authRouter=require("./routes/authRoutes")
const authMiddleware=require("./middlewares/authMiddleware")
const app = express();
const port= process.env.PORT


app.use(express.json())
app.use(cookieParser());
app.use("/auth",authRouter)


app.get("/home", (req, res) => {
    res.send(" This is home page");
})
// app.get("/about",authMiddleware, (req, res) => {  
//     res.send(" This is about page");
// })

app.listen(port, async () => {
    try {
        await connection
        console.log(`server running on this port=> 8080 and db is also connected`)
    } catch (error) {
        console.log(error)
    }
})