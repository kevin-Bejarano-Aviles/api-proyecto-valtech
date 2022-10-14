require('dotenv').config()
const express = require('express');
const app = express();
const db = require('./models/index');
/* const methodOverride = require('method-override'); */
const port = process.env.PORT||8000;
const cors = require('cors');


//Use express static to declare our public folder
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}));
app.use(cors({
  credentials:true,
  origin:[process.env.CORS_ORIGIN],
  methods:["GET","POST","PUT","DELETE"]
}));
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

