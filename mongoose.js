import mongoose from "mongoose"


export const connectdb=async()=>{
    try {
      
      const {connection} = await mongoose.connect(process.env.MONGO_URI, {
         dbName: "Todo_list",
      })        
       console.log(`connected to ${connection.host}`);
   
    } catch (error) {
       console.log(error);
    }
       } 