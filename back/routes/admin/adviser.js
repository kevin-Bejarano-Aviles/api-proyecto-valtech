const {Router} = require('express');
const router = Router();
const {adminCheck} = require('../../middlewares/index');
const {assignAdviser,getAllAdvisers} = require('../../controllers/admin/adviser');
router.get('/',adminCheck,getAllAdvisers);
router.put('/student/:id',adminCheck,assignAdviser);
module.exports = router;
