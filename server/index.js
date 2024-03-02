const express = require('express')
const cors = require("cors")
require('dotenv').config()


const customerOrderRouter = require('./routes/customerOrder')
const { connect_db } = require('./connection')



const app = express()
const port = 4001

connect_db()
app.use(express.json())
app.use(cors())
app.use('/api/order/',customerOrderRouter)

app.get('/test',(req,res) => {
    res.json({message: "Hello World"})
})



app.listen(port, console.log(`running on port number ${port}`))