const mysql =require("mysql2/promise");
const pool =mysql.createPool({
    host:'localhost',
    user:'root',
    password:process.env.password,
    database:'contact_manager',
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
})
module.exports=pool;
