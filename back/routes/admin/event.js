const {Router} = require('express');
const router = Router();
const eventCheck = require('../../validations/eventCheck');
const {isAuthorized,fieldValidation} = require('../../middlewares/index');
const {createEvent,getAllEventsByFilters,deleteEvent} = require('../../controllers/admin/event');
router.post('/',isAuthorized,eventCheck,fieldValidation,createEvent);
router.get('/',isAuthorized,getAllEventsByFilters);
router.delete('/:id',isAuthorized,deleteEvent);
module.exports = router;