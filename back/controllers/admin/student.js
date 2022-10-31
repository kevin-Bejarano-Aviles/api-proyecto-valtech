const bcryptjs = require('bcryptjs');
const { request, response } = require('express');
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
    res.status(201).json({
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
const getStudent = async (req = request, res = response) => {
  try {
    const student = await studentBy('id', req.params.id);
    if (!student) {
      logger.warn(`ID Student: '${req.params.id}' not found in db. Method: GET. Url: ${req.originalUrl}.`);
      return res.status(204).json({
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
const assignAdviser = async (req, res) => {
  try {
    const { idAdviser } = req.body;
    const { id } = req.params;
    const student = await StudentModel.update(
      {
        adviserId: idAdviser,
      },
      {
        where: {
          id,
        },
      },
    );
    if (student < 1) {
      logger.warn(`ID Student: '${id}', not found in db. Method: PUT.  Url: ${req.originalUrl}.`);
      return res.status(204).json({
        message: 'Student not found',
        data: '',
      });
    }
    res.status(201).json({
      message: `Adviser assigned to the student with the id ${id}`,
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
  assignAdviser,
  getAllStudent,
  getStudent,
};
