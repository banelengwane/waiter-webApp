const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const flash = require('express-flash')
const session = require('express-session')
const pg = require('pg')
const Pool = pg.Pool

// SSL connection
let useSSL = false
let local = process.env.LOCAL || false
if (process.env.DATABASE_URL && !local) {
  useSSL = true
}

const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder123@localhost/waiters'

const pool = new Pool({
  connectionString,
  useSSL
})

let app = express()

let myhbp = exphbs.create({
  defaultLayout: 'main'
})

app.engine('handlebars', myhbp.engine)
app.set('view engine', 'handlebars')

app.use(session({
  secret: 'This is my string used for session in http',
  resave: false,
  saveUninitialized: true
}))

// initialise the falsh middleware
app.use(flash())

// parse application/x-www.form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application-json
app.use(bodyParser.json())

// add public folder
app.use(express.static('public/'))

app.get('/', function (req, res) {
  res.render('home')
})

let PORT = process.env.PORT || 4001

app.listen(PORT, function () {
  console.log('App started on Port, ', PORT)
})
