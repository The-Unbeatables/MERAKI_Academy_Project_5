const { Pool } = require('pg');

const connectionString = process.env.DB_URL


const pool = new Pool({
    connectionString,
})

pool.connect((err, pool) => {
    if(err){
        
        console.log("an error occured whlie connecting to database");
        return
    }else{
        console.log("ALL SYSTEMS GO");
    }
})

module.exports = {pool}