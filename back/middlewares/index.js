const adminCheck = require('./adminCheck');
const upload = require('./upAvatar');
const fieldValidation = require('./fieldValidation');
module.exports = {
    ...adminCheck,
    ...upload,
    ...fieldValidation
}