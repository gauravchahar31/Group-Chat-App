const express = require('express');
const router = express.Router();

const messageController = require('../controllers/message');

router.post('/newMessage', messageController.newMessage);
router.get('/getMessages', messageController.getMessages);

module.exports = router;