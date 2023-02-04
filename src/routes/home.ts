import {Router} from 'express';
const router = Router();

import * as homeController from '../controllers/home';

router.get('/', homeController.homePage);
router.get('/login', homeController.loginPage);
router.get('/signup', homeController.signupPage);
router.get('/logout', homeController.logout);
router.get('/forgotPassword', homeController.forgotPassword);

export default router;