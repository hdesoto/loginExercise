// REQUIRED
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
// const session = require('express-session')
// const moment = require('moment')
const cookieSession = require('cookie-session')
const fs = require('fs')
// const router = express.Router()
// VARIABLES
const PORT = 3003
const pathPublic = path.join(__dirname, 'public')

const app = express()

app.use(express.static(pathPublic))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieSession({
  name: 'This is a Session Cookie',
  keys: ['ThisIsTheFirstKey', 'ThisIsASecondKey']
}))

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  if (req.session.logged === true) {
    res.redirect('/welcome')
  } else {
    res.redirect('/login')
  }
})

app.get('/register', (req,res) => {
  if(!req.session.logged){
    res.render('pages/register')
  } else {
    //alert('Your are already registered')
    res.redirect('/')
  }
})

app.post('/register', (req,res) =>{
  const {newUser,newPassword} = req.body
  

  fs.append('Usernames-Passwords.txt',)
})

app.get('/login', (req, res) => {
  if (req.session.logged === true) {
    res.redirect('/welcome')
  } else {
    res.render('pages/login')
  }
})

app.post('/login', (req, res) => {
  // LISTADO DE USUARIO REGISTRADOS
  const aUsers = fs.readFileSync('Usernames-Passwords.txt', 'utf-8').trim().split('\r\n')
  const {user,password} = req.body
  // const user = req.body.user
  // const password = req.body.password
  const userPassword = `${user}:${password}`
  
  // Intentar hacerlo con una promesa, de manera asíncrona, usando algún módulo NPM que maneje Promises

  if (aUsers.some(function (e) {
    return e === userPassword
  })) {
    req.session.logged = true
    req.session.user = user
    res.redirect('/welcome')
  } else {
    req.session.logged = false
    res.redirect('/error')
  }
})

app.get('/logout', (req, res) => {
  console.log(req.session)
  req.session.logged = false
  res.redirect('/')
})

app.get('/welcome', (req, res) => {
  if (req.session.logged === true) {
    res.render('pages/welcome', {
      user: req.session.user
    })
  } else {
    res.render('pages/error')
  }
})

app.get('/error', (req, res) => {
  res.render('pages/error')
})

app.listen(PORT)
console.log(`Listening on PORT ${PORT}`)
