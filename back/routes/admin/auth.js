const {Router} = require('express');
const router = Router();
const {adminCheck} = require('../../middlewares/index');
const {login,logOut} = require('../../controllers/admin/auth');
router.post('/login',login);
router.get('/logout',adminCheck,logOut);
module.exports = router;