const {Router} = require('express');
const router = Router();
const {isAuthorized} = require('../../middlewares/index');
const {assignAdviser,getAllAdvisers} = require('../../controllers/admin/adviser');
router.get('/',isAuthorized,getAllAdvisers);
router.put('/student/:id',isAuthorized,assignAdviser);
module.exports = router;
