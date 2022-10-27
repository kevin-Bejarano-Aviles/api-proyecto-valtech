const { generateJWT } = require('../../helpers/generate-jwt');
const { adminBy } = require('../../helpers/findAdminBy');
const { checkPassword } = require('../../helpers/checkCredentials');
const logger = require('../../utils/logger');
// Method to login our admin
const login = async (req, res) => {
  const { email, pass } = req.body;
  try {
    const admin = await adminBy('email', email);
    if (!admin) {
      return res.status(400).json({
        message: 'Invalid credentials',
        data: '',
      });
    }
    if (!checkPassword(pass, admin.password)) {
      return res.status(400).json({
        message: 'Invalid credentials',
        data: '',
      });
    }
    const token = generateJWT(admin.id);
    res.status(200).json({
      message: '',
      data: {
        admin: {
          id: admin.id,
          fullName: admin.fullName,
          avatar: admin.avatar,
          email: admin.email,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    });
    logger.error(error);
  }
};
module.exports = {
  login,
};
