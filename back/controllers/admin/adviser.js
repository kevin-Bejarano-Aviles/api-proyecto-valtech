const { Advisers: AdviserModel } = require('../../data/models');
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

module.exports = {
  getAllAdvisers,
};
