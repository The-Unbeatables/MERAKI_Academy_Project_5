const { Pool } = require('pg');

const connectionString = process.env.DB_URL || 'postgres://dvdjjvpi:mvVUb868oVoKL80q33LkGufl2BmfLt2j@lucky.db.elephantsql.com/dvdjjvpi'


const pool = new Pool({
    connectionString,
})

pool.connect((err, pool) => {
    if(err){
        
        console.log("an error occured whlie connecting to database");
        return
    }else{
        console.log("ALL SYSTEMS GO ");
    }
})

module.exports = {pool}