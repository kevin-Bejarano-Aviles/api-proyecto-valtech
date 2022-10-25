const { Router } = require('express');

const router = Router();
const eventValidations = require('../../validations/eventValidations');
const { isAuthorized, fieldValidations } = require('../../middlewares/index');
const {
  createEvent,
  getAllEventsByFilters,
  deleteEvent,
} = require('../../controllers/admin/event');

router.post('/', isAuthorized, eventValidations, fieldValidations, createEvent);
router.get('/', isAuthorized, getAllEventsByFilters);
router.delete('/:id', isAuthorized, deleteEvent);
module.exports = router;
