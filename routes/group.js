const express = require('express');
const router = express.Router();

const groupController = require('../controllers/group');

router.get('/getUserGroups', groupController.getUserGroups);
router.post('/createGroup', groupController.createGroup);


module.exports = router;