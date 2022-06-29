const express = require('express')
const connectToMongodb = require('./db')
const cors = require('cors')
connectToMongodb();

const app = express()
const PORT = 5000

app.use(express.json())
app.use(cors())


app.listen(PORT, ()=>{
    console.log(`serer running on port: ${PORT}`)
})
