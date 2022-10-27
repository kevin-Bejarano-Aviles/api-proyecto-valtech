const { Router } = require('express');

const router = Router();
const { isAuthorized } = require('../../middlewares/index');
const { getAllAdvisers } = require('../../controllers/admin/adviser');

router.get('/', isAuthorized, getAllAdvisers);
module.exports = router;
