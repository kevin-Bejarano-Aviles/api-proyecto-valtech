const { Advisers: AdviserModel, Students: StudentModel } = require('../../models');
// Method to get all the advisers
const getAllAdvisers = async (req, res) => {
  try {
    const advisers = await AdviserModel.findAll();
    res.status(200).json({
      status: '200 OK',
      message: '',
      data: { advisers },
    });
  } catch (error) {
    res.status(500).json({
      status: '500 Internar server error',
      message: 'Error MySQL/Express/Node',
    });
    console.log({ error: error.message });
  }
};
const assignAdviser = async (req, res) => {
  try {
    const { idAdviser } = req.body;
    const { id } = req.params;
    await StudentModel.update({
      adviserId: idAdviser,
    }, {
      where: {
        id,
      },
    });
    res.status(200).json({
      status: '200 OK',
      message: `adviser assigned to the student with the id ${id}`,
      data: '',
    });
  } catch (error) {
    res.status(500).json({
      status: '500 Internar server error',
      message: 'Error MySQL/Express/Node',
    });
    console.log({ error: error.message });
  }
};

module.exports = {
  assignAdviser,
  getAllAdvisers,
};
