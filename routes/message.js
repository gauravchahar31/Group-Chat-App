const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message');

router.get('/getMessages', messageController.getMessages);
router.get('/lastMessage', messageController.getlastMessage);
router.get('/getGroupMessages/:groupId', messageController.getGroupMessages);
router.post('/newGroupMessage', messageController.newGroupMessage);

module.exports = router;