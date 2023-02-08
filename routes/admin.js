const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.post('/makeGroupAdmin', adminController.makeGroupAdmin);
router.get('/checkAdmin', adminController.checkAdmin);
router.get('/getGroupAdmins', adminController.getGroupAdmins);
router.post('/makeNewAdmin', adminController.createNewAdmin);
router.post('/removeAdmin', adminController.removeAdmin);

module.exports = router;