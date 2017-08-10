const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const app = express()
const PORT = 3003
const pathPublic = path.join(__dirname,'public')

app.use(express.static(pathPublic))



app.set('view engine','pug')



app.get('/',(req,res) => {
  res.render('pages/login')
})


app.get('/login',(req,res) => {
  res.render('pages/login')
})


app.get('/welcome',(req,res) =>{
  res.render('pages/welcome')
})


app.listen(PORT)
console.log(`Listening on PORT ${PORT}`)










