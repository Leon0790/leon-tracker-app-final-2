const { MongoClient } = require("mongodb")

const uri = process.env.MONGO_URI

let db

async function connectDB(){

if(!db){

const client = new MongoClient(uri)

await client.connect()

db = client.db("school")

}

return db

}

module.exports = connectDB
