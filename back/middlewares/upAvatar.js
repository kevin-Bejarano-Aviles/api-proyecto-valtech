//Require multer
const multer = require('multer')
//Require path
const path = require('path');
const storage = multer.diskStorage({ //To save img
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,'..','..','front','src','img','students')) //img destination from edit form
    },/*  */
    filename: function (req, file, cb) {
      // We name the img with the date, and a random number so will never repeat
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname)) 
    }
  })

const upload =  multer({ storage: storage }) 

module.exports = upload