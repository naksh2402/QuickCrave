const express=require('express');
const app=express();
const create=require('./Routes/createUser.js')
const display=require('./Routes/DisplayData.js');
const port=5000;   
const cors=require('cors');
const mongoDB=require("./db.js")
const order=require("./Routes/OrderData.js");
mongoDB();

app.get('/',(req,res)=>{
    res.send("heheh");
})


app.use(cors());
app.use(express.json());
app.use('/api',create);
app.use('/api',display);
app.use('/api',order);

app.listen(port,(req,res)=>{
    console.log("I am listening to this port 5000");
});