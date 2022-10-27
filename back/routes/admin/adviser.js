const { Router } = require('express');

const router = Router();
const { isAuthorized } = require('../../middlewares/index');
const { assignAdviser, getAllAdvisers, getAdviser } = require('../../controllers/admin/adviser');

router.get('/', isAuthorized, getAllAdvisers);
router.get('/:id', isAuthorized, getAdviser);
router.put('/student/:id', isAuthorized, assignAdviser);
module.exports = router;
