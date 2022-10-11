const {Advisers:AdviserModel,Students:StudentModel} = require('../../models');

//Method to get all the advisers
const getAllAdvisers = async (req,res) => {
    try {
        const advisers = await AdviserModel.findAll();
        res.json({advisers});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};
const assignAdviser = async (req,res) => {
    try {
        const {idAdviser} = req.body;
        const {id} = req.params;
        await StudentModel.update({
        adviserId : idAdviser
       },{
        where :{
            id : id
        }
       });
       res.status(200).json({message:`adviser asignado al estudiante con id ${id}`});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
};

module.exports = {
    assignAdviser,
    getAllAdvisers
}