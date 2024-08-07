import mongoose from "mongoose";
import config from "../config.js";


const dbConnect = (app)=>
mongoose.connect(config.MONGO_URI)
.then(()=>app
.listen(config.PORT,  ()=> console.log(`server is running on http://localhost:${config.PORT}`)))


export default dbConnect