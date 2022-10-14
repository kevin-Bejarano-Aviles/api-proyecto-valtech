require('dotenv').config()
const express = require('express');
const app = express();
//const db = require('./database/db');
const db = require('./models/index');
//const dotenv = require('dotenv');
const session = require('express-session');
/* const methodOverride = require('method-override'); */
const port = process.env.PORT||8000;
const cors = require('cors');
const cookie = require('cookie-parser');
/* const adminRoutes = require('./routes/admin.js') */

//Use express static to declare our public folder
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));
app.use(cors({
  credentials:true,
  origin:[process.env.CORS_ORIGIN],
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
app.use('/admin/advisers',require('./routes/admin/adviser'));
app.use('/admin/auth',require('./routes/admin/auth'));
app.use('/admin/events',require('./routes/admin/event'));
app.use('/admin/students',require('./routes/admin/student'));

const dbConections = async()=>{
  try {
    await db.sequelize.authenticate()
    console.log('Succesfull connection')
    app.listen(port, ()=>{
      console.log(`SERVER UP running in http://localhost:${port}`);
  });
    } catch (error) {
      console.log(`The error is: ${error}`) 
      throw new Error('Error a la hora de iniciar la base de datos');
    }
}
dbConections();

