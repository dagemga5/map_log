const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const pinRoute =require("./routes/pins");
const userRoute =require("./routes/users");


dotenv.config();
app.use(express.json())
app.use(cors({
    origin: process.env.CORS_ORIGIN,
}));
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}, () => {console.log(' database connected')})

app.use("/api/pins" , pinRoute);
app.use("/api/users" , userRoute)
app.listen( 8800 , () => {
    console.log('server running')
})

