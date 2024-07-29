// const mysql = require('mysql2/promise')

// const pool = mysql.createPool({
//     host : "localhost",
//     user : "host",
//     password : "tester@01",

// })

// module.exports = pool

const mongodb = require('mongodb')

let url = 'mongodb://localhost:27017'
if(process.env.MONGODB_URL){
    url = process.env.MONGODB_URL
}

const mongoClient = mongodb.MongoClient;

let database

async function connect() {
    const client = await mongoClient.connect(url)
    database = client.db('electro')
};

function getDb() {
    if(!database){
        throw{ message : "Database connection not established!"}
    }
    return database
};

module.exports = {
    connectToDatabase : connect,
    getDb : getDb
}