const express  = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 5000;

app.use(express.json());

const routers = require('./routes/todoRoutes')
app.use('/api/v1',routers);
app.get('/',(req, res) =>{
    res.send("Welcome to TODO App");
})

//  DB Connection
const dbConnect = require('./config/database')
dbConnect();

// Server start on port
app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
})