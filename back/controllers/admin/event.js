const {Events:EventModel,Students:StudentModel,Advisers:AdviserModel} = require('../../models');
const db = require('../../models/index');
const {Op} = require('sequelize')
const createEvent = async (req,res) => {
    try {
        const {students,name,date,time,detail,duration,adviser_event_id} = req.body;
        await db.sequelize.query("ALTER TABLE events AUTO_INCREMENT = 1");
        const event = await EventModel.create({
            name : name,
            date : date,
            time : time,
            detail:detail,
            duration : duration,
            adviser_event_id : adviser_event_id
        });
        students.forEach(async(item)=>{
            const student = await StudentModel.findOne({
               where : {
                id : item.id
               } 
            });
            await event.addStudent(student); 
        });
    res.json({message:'Event created'});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};
const getAllEventsByFilters = async(req,res)=>{
    const {student='',from=0,limit=10} = req.query;
    try {
        const events = await EventModel.findAll({
            include:[{
                model:StudentModel,
                where:{
                    fullName:{
                        [Op.substring]:student
                    }
                },
                attributes:['id','fullName']
            },{
                model:AdviserModel
            }],
            offset:Number(from),
            limit:Number(limit)
        });
        if(events.length<1){
            return res.status(404).json({message:'No se encontraron resultados'})
        }
        res.json({events,cant:events.length});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
};
const deleteEvent = async(req,res)=>{
    const {id} = req.params;
    try {
        const event = await EventModel.destroy({
            where:{
                id:id
            }
        });
        if(!event){
            return res.status(404).json({message:'No se puede eliminar el evento porque no existe en la base de datos'})
        }
        res.json({message:'Evento eliminado'});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};
module.exports = {
    createEvent,
    deleteEvent,
    getAllEventsByFilters
}