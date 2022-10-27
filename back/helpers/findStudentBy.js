const { Students: StudentModel, Advisers: AdviserModel } = require('../data/models');

const studentBy = async (colum, value) => {
  const student = await StudentModel.findOne({
    where: {
      [colum]: value,
    },
    include: {
      model: AdviserModel,
    },
  });
  return student;
};
module.exports = {
  studentBy,
};
