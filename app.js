const express = require('express') 
const cookieParser = require('cookie-parser') 
const logger = require('morgan') 
const cors = require('cors') 

const perfumeRouter = require('./routes/perfume') 


const app = express()

app.use(logger('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())


app.get('/favicon.ico', (req, res) => res.status(204))

app.use('/perfumes', perfumeRouter) 

module.exports = app