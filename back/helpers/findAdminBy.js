const { Admins: AdminModel } = require('../data/models');

const adminBy = async (colum, value) => {
  const admin = await AdminModel.findOne({
    where: {
      [colum]: value,
    },
  });
  return admin;
};
module.exports = {
  adminBy,
};
