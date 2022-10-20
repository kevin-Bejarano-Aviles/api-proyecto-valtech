const AdviserModel = require('../../models').Advisers;
const StudentModel = require('../../models').Students;
const EventModel = require('../../models').Events;
const db = require('../../models/index');
const {Op} = require('sequelize')
const createEvent = async (req,res) => {
    try {
        const {studentsId,name,date,time,detail,duration,adviser_event_id} = req.body;
        await db.sequelize.query("ALTER TABLE events AUTO_INCREMENT = 1");
        const event = await EventModel.create({
            name : name,
            date : date,
            time : time,
            detail:detail,
            duration : duration,
            adviser_event_id : adviser_event_id
        });
        await event.addStudent(studentsId);    
        res.status(200).json({
        status:'200 OK',
        message:'Event created',
        data:''
    });
    } catch (error) {
        res.status(500).json({
            status: '500 Internar server error',
            message: 'Error MySQL/Express/Node'
        });
        console.log({error:error.message});

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
                model:AdviserModel,
                attributes:['id','fullName']
            }],
            offset:Number(from),
            limit:Number(limit)
        });
        if(events.length<1){
            return res.status(404).json({
                status:'404 Not found',
                message:'No results found',
                data:''
            });
        };
        res.status(200).json({
            status:'200 OK',
            message:'',
            data:{
                events,
                cant:events.length
            }
        });
    } catch (error) {
        res.status(500).json({
            status: '500 Internar server error',
            message: 'Error MySQL/Express/Node'
        });
        console.log({error:error.message});
    }
};
const deleteEvent = async(req,res)=>{
    const {id} = req.params;
    try {
        await EventModel.destroy({
            where:{
                id:id
            }
        });
        res.status(200).json({
            status:'200 OK',
            message:'Deleted event',
            data:''
        });
    } catch (error) {
        res.status(500).json({
            status: '500 Internar server error',
            message: 'Error MySQL/Express/Node'
        });
        console.log({error:error.message});
    }
};
module.exports = {
    createEvent,
    deleteEvent,
    getAllEventsByFilters
}
