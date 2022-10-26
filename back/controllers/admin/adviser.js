const { Advisers: AdviserModel, Students: StudentModel } = require('../../data/models');
const logger = require('../../utils/logger');
// Method to get all the advisers
const getAllAdvisers = async (req, res) => {
  try {
    const advisers = await AdviserModel.findAll();
    res.status(200).json({
      message: '',
      data: { advisers },
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
  assignAdviser,
  getAllAdvisers,
};
