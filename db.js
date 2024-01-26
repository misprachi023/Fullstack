const dotenv=require('dotenv')
const mongoose=require('mongoose')
dotenv.config();
const connection=mongoose.connect(process.env.mongoURL);
module.exports={
    connection
}