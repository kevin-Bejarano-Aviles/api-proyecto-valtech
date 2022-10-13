const isAuthorized = require('./isAuthorized');
const upload = require('./upAvatar');
const fieldValidation = require('./fieldValidation');
module.exports = {
    ...isAuthorized,
    ...upload,
    ...fieldValidation
}