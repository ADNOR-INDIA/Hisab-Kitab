import express from 'express'
import connectToMongodb  from './db.js'
import cors from 'cors'
import nodemailer from 'nodemailer'

import invoiceRoutes from  './routes/invoices.js'
import clientRoutes  from './routes/clients.js'
import userRoutes  from  './routes/userRoutes.js'

connectToMongodb();

const app = express()
const PORT = 5000

app.use(express.json())
app.use(cors())

app.use('./invoices', invoiceRoutes)
app.use('./clients', clientRoutes)
app.use('./users', userRoutes)

app.get('/', (req, res)=>{
    res.send('SERVER IS RUNNING')
})


app.listen(PORT, ()=>{
    console.log(`serer running on port: ${PORT}`)
})
