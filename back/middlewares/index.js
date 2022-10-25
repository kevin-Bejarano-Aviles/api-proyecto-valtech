const isAuthorized = require('./isAuthorized');
const upload = require('./upAvatar');
const fieldValidations = require('./fieldValidations');

module.exports = {
  ...isAuthorized,
  ...upload,
  ...fieldValidations,
};
