 const express =  require('express')
 const mongoose = require('mongoose')
 const cors = require('cors');
 const noteRoutes = require('./routes/notes')
 require('dotenv').config()
 const app = express()


 app.use(cors({
     origin: 'http://localhost:3001',
     methods: ['GET', 'POST', 'PUT', 'DELETE'],
     allowedHeaders: ['Content-Type', 'Authorization'],
 }))

 app.use(express.json())
app.use('/api/notes', noteRoutes);

 app.use((err,req,res,next)=>{
    console.error(err.stack)
    res.status(500).send('Something broke!')
 })


 mongoose.connect(process.env.MONGO_URI)
 .then(() => {
     console.log('Connected to MongoDB')
     app.listen(process.env.PORT, () => {
         console.log('Server is listening on port 5000')
     })
 })
 .catch((err) => {
     console.error('Error connecting to MongoDB:', err)
 })
