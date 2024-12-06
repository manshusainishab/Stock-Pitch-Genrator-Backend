import {mongoose, connect } from "mongoose";
export const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URL, {
        dbName:  "StockPitchGentrator"
    }).then(()=>{
        console.log("db connected successfully");
    }).catch((err)=>{
        console.log(err.message);
    })
} 