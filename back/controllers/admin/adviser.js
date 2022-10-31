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
const getAdviser = async (req, res) => {
  const { id } = req.params;
  try {
    const adviser = await AdviserModel.findOne({
      where: {
        id,
      },
    });
    if (!adviser) {
      return res.status(404).json({
        message: 'adviser not found',
        data: '',
      });
    }
    res.status(200).json({
      message: '',
      data: { adviser },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    });
    logger.error(error);
  }
};

module.exports = {
  getAdviser,
  getAllAdvisers,
};
