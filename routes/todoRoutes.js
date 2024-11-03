const express = require('express');

const router = express.Router();
const {signup} = require('../controllers/signUp');
const {login} = require('../controllers/login');
const {createTask, getTasks, updateStatus, deleteTask, gettasksByStatus} = require('../controllers/taskController');

// const {auth} = require('../middleware/auth')

router.post('/signup', signup);
router.post('/login', login);

router.post('/createTask',createTask);
router.post('/update', updateStatus);
router.post('/deleteTask', deleteTask)

router.get('/getTasks', getTasks);
router.get('/getTasksByStatus/:userId', gettasksByStatus)

module.exports = router;