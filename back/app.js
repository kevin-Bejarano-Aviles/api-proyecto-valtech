const express = require('express');
const app = express();
const db = require('./database/db');
const dotenv = require('dotenv');
const session = require('express-session');
/* const methodOverride = require('method-override'); */
const port = 8000;
const cors = require('cors');
const cookie = require('cookie-parser');
const adminRoutes = require('./routes/admin.js')

//Use express static to declare our public folder
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));
app.use(cors({
  credentials:true,
  origin:["http://localhost:3000"],
  methods:["GET","POST","PUT","DELETE"]
}));
app.use(session({
  key:'userId', 
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: false,
  cookie:{
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  } 
}));
app.use(cookie())
app.use(express.json());
/* app.use(methodOverride('_method')); */

app.use('/admin',adminRoutes);

try {
  db.authenticate()
  console.log('Succesfull connection')
  } catch (error) {
    console.log(`The error is: ${error}`)
  }

dotenv.config({path: './env/.env'})

app.listen(port, ()=>{
    console.log('SERVER UP running in http://localhost:8000')
   
})