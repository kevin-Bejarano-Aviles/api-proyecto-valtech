const { Op } = require('sequelize');
const AdviserModel = require('../../data/models').Advisers;
const StudentModel = require('../../data/models').Students;
const EventModel = require('../../data/models').Events;
const db = require('../../data/models/index');
const logger = require('../../utils/logger');
/* eslint camelcase:"off" */
const createEvent = async (req, res) => {
  try {
    const {
      studentsId, name, date, time, detail, duration, adviser_event_id,
    } = req.body;
    await db.sequelize.query('ALTER TABLE events AUTO_INCREMENT = 1');
    const event = await EventModel.create({
      name,
      date,
      time,
      detail,
      duration,
      adviser_event_id,
    });
    await event.addStudent(studentsId);
    res.status(200).json({
      message: 'Event created',
      data: '',
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    });
    logger.error(error);
  }
};
const getAllEventsByFilters = async (req, res) => {
  const { student = '', from = 0, limit = 10 } = req.query;
  try {
    const { count: totalCount, rows: events } = await EventModel.findAndCountAll({
      include: [
        {
          model: AdviserModel,
          attributes: ['id', 'fullName'],
        },
        {
          model: StudentModel,
          where: {
            fullName: {
              [Op.substring]: student,
            },
          },
          attributes: ['id', 'fullName'],
        },
      ],
      offset: Number(from),
      limit: Number(limit),
      distinct: true,
    });
    if (totalCount < 1) {
      return res.status(404).json({
        message: 'No results found',
        data: '',
      });
    }
    res.status(200).json({
      message: '',
      data: {
        totalCount,
        lengthEventsSent: events.length,
        events,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server Error',
    });
    logger.error(error);
  }
};
const deleteEvent = async (req, res) => {
  const { id } = req.params;
  try {
    await EventModel.destroy({
      where: {
        id,
      },
    });
    res.status(200).json({
      status: '200 OK',
      message: 'Deleted event',
      data: '',
    });
  } catch (error) {
    res.status(500).json({
      status: '500 Internar server error',
      message: 'Server Error',
    });
    logger.error(error);
  }
};
module.exports = {
  createEvent,
  deleteEvent,
  getAllEventsByFilters,
};
