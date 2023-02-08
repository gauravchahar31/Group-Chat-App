const express = require('express');
const router = express.Router();

const groupController = require('../controllers/group');

router.get('/getUserGroups', groupController.getUserGroups);
router.get('/checkGroupUser', groupController.checkGroupUser);
router.post('/createGroup', groupController.createGroup);
router.post('/removeFromGroup', groupController.removeFromGroup);
router.post('/addNewGroupUser', groupController.addNewGroupUser);

module.exports = router;