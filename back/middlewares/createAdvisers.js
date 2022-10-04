const db = require('../database/db');
//const adviserModel = require('../models/adviserModel');

const advisers = [
    {
        fullName : 'Daisy Paredes',
        email : 'dparedes@arbusta.net',
        avatar : 'adviser01.png',
        phoneNumber : '1127458945'
    },
    {
        fullName : 'Gabriel Muñoz',
        email : 'gabriel.munoz@arbusta.net',
        avatar : 'adviser02.png',
        phoneNumber : '1128458945'
    },
    {
        fullName : 'Katherine Carmona Carrasco',
        email : 'katherine.carmona@arbusta.net',
        avatar : 'adviser03.png',
        phoneNumber : '1129458945'
    },
    {
        fullName : 'Julieta Speranza',
        email : 'julieta.speranza@arbusta.net',
        avatar : 'adviser04.png',
        phoneNumber : '1130458945'
    }
]

module.exports = async (req,res,next) => {
    const adviserExist = await adviserModel.findOne({
        where : {
            email : 'dparedes@arbusta.net' && 'gabriel.munoz@arbusta.net' && 'katherine.carmona@arbusta.net' && 'julieta.speranza@arbusta.net'
        }
    });

    if(!adviserExist){
        await db.query("ALTER TABLE advisers AUTO_INCREMENT = 1");
        advisers.forEach((adviser) => adviserModel.create(adviser));
        next();
    }else{
        next();
    }
}