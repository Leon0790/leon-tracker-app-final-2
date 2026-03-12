const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const connectDB = require("../database/db")

const router = express.Router()

router.post("/register", async(req,res)=>{

const db = await connectDB()

const {email,password} = req.body

const hash = await bcrypt.hash(password,10)

await db.collection("teachers").insertOne({
email,
password:hash
})

res.json({message:"Teacher registered"})

})

router.post("/login", async(req,res)=>{

const db = await connectDB()

const {email,password} = req.body

const teacher = await db.collection("teachers").findOne({email})

if(!teacher) return res.status(401).json({error:"User not found"})

const valid = await bcrypt.compare(password,teacher.password)

if(!valid) return res.status(401).json({error:"Wrong password"})

const token = jwt.sign({id:teacher._id},"secret")

res.json({token})

})

module.exports = router
