import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
export const connection=mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port:process.env.DB_PORT
})

// connection.end();


// connection.connect((err)=>{
//     if(err){
//         console.log(err.message);
        
//     }
//     console.log('db connected');
// })