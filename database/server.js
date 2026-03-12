const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const students = require("./routes/students")
const auth = require("./routes/auth")

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use(express.static("public"))

app.use("/api/students", students)
app.use("/api/auth", auth)

app.get("/", (req,res)=>{
res.send("Leon Student Tracker Running")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
console.log("Server running on port", PORT)
})
