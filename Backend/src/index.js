import http from "http";
import { app } from "./App.js";
import dotenv from "dotenv"
import connectDB from "./DB/db.js"
import { initializeSocket } from './socket.js';

dotenv.config({
    path:'../.env'
})
connectDB();

const server = http.createServer(app);
initializeSocket(server);

try {
    server.listen(process.env.PORT || 8000,()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);
    })
} catch (error) {
    console.log("Mongo DB connection failed !!!",err);
}



    
