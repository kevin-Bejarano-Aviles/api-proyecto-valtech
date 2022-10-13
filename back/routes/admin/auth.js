const {Router} = require('express');
const router = Router();
const {isAuthorized} = require('../../middlewares/index');
const {login,logOut} = require('../../controllers/admin/auth');
router.post('/login',login);
router.get('/logout',isAuthorized,logOut);
module.exports = router;