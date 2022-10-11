const {Router} = require('express');
const router = Router();
const eventCheck = require('../../validations/eventCheck');
const {adminCheck,fieldValidation} = require('../../middlewares/index');
const {createEvent,getAllEventsByFilters,deleteEvent} = require('../../controllers/admin/event');
router.post('/',adminCheck,eventCheck,fieldValidation,createEvent);
router.get('/',adminCheck,getAllEventsByFilters);
router.delete('/:id',adminCheck,deleteEvent);
module.exports = router;