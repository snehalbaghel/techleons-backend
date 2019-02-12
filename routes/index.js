const express = require('express');
const router = express.Router();

const ctrlAttendance = require('../controllers/attendance');

router.get('getParticipants')
