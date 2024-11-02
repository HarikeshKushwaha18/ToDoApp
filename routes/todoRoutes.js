const express = require('express');

const router = express.Router();
const {signup} = require('../controllers/signUp');
const {login} = require('../controllers/login');
const {createTask, getTasks, updateStatus, deleteTask} = require('../controllers/taskController');

router.post('/auth/signup', signup);
router.post('/auth/login', login);

router.post('/createTask',createTask);
router.post('/update', updateStatus);
router.post('/deleteTask', deleteTask)

router.get('/getTasks', getTasks);

module.exports = router;