const bcryptjs = require('bcryptjs');
const StudentModel = require('../../data/models').Students;
const db = require('../../data/models/index');
const { studentBy } = require('../../helpers/findStudentBy');
const logger = require('../../utils/logger');
// Method to add a student
const addStudent = async (req, res) => {
  const {
    fullName, email, phoneNumber, program, dni, school, age, address, motive, user, pass,
  } = req.body;
  try {
    const avatar = req.files[0].filename;
    const passHash = bcryptjs.hashSync(pass, 12);
    await db.sequelize.query('ALTER TABLE students AUTO_INCREMENT = 1'); // This line is to reset id so our deletes ids can use the deleted ones
    await StudentModel.create({
      fullName,
      email,
      phoneNumber,
      program,
      avatar,
      dni,
      school,
      age,
      address,
      motive,
      user,
      password: passHash,
    });
    res.status(200).json({
      message: 'Student created successfully',
      data: '',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    });
    logger.error(error);
  }
};
// Method to get all students
const getAllStudent = async (req, res) => {
  try {
    const students = await StudentModel.findAll();
    res.status(200).json({
      message: '',
      data: { students },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    });
    logger.error(error);
  }
};
// Method to get one student
const getStudent = async (req, res) => {
  try {
    const student = await studentBy('id', req.params.id);
    if (!student) {
      return res.status(404).json({
        message: 'user not found',
        data: '',
      });
    }
    res.status(200).json({
      message: '',
      data: { student },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    });
    logger.error(error);
  }
};
module.exports = {
  addStudent,
  getAllStudent,
  getStudent,
};
