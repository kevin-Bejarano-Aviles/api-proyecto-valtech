const bcryptjs = require('bcryptjs');

const checkPassword = (pass, userPass) => bcryptjs.compareSync(pass, userPass);
module.exports = {
  checkPassword,
};
