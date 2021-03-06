require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

// all routes
var playerRoutes = require('./routes/playerRoute')
var adminRoutes = require('./routes/adminRoutes')
const authRoutes = require('./routes/authRoutes')
const ownerRoutes = require('./routes/ownerRoutes')
const contactRoutes = require('./routes/contactRoute')


// some dependency
app.use(express.urlencoded({ extended: true , limit: '50mb'}));
app.use(express.json({limit: '50mb'}));
app.use(cors())

//database connection
const db = require('./database/db');
db()

//for testing purpose
app.get('/',(req,res)=>{
    res.send("Hello SoccerLand")
})

// use all routes
app.use('/api', authRoutes)
app.use('/user', playerRoutes)
app.use('/', contactRoutes)
app.use('/admin', adminRoutes)
app.use('/owner', ownerRoutes)

 app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

