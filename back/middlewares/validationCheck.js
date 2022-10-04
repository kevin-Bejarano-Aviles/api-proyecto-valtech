const {validationResult} = require('express-validator')
const path = require('path');
const fs = require('fs');
const validationFields = (req,res,next)=>{
    //If validationResult of "errors" is empty can create a new student, else we will see the error
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        //super raro, si el form no tiene nada ni las variables,no reconoce a req.files[0] si tiene un campo pero no "avatar"
        //tambien falla
        if(typeof req.files != 'undefined' && typeof req.files[0] != 'undefined'){
            //console.log(req.files[0]);
            fs.unlinkSync(path.join(__dirname,'..','..','front','src','img','students',`${req.files[0].filename}`));
        }
        return res.status(400).json(errors.mapped());
        // If we have an image will assign avatar
    }else{
        next()       
    }
}
module.exports = {
    validationFields
}