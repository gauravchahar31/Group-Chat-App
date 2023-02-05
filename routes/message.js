const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message');

router.post('/newMessage', messageController.newMessage);
router.get('/getMessages/:lastMessage', messageController.getMessages);

module.exports = router;