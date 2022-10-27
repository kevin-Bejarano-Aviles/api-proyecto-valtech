const { Router } = require('express');

const router = Router();
const { isAuthorized } = require('../../middlewares/index');
const { getAllAdvisers, getAdviser } = require('../../controllers/admin/adviser');

router.get('/', isAuthorized, getAllAdvisers);
router.get('/:id', isAuthorized, getAdviser);
module.exports = router;
