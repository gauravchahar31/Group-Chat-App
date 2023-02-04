import express from 'express';
import dotenv from 'dotenv';
const app = express();
dotenv.config();

app.use(express.static('app/views'));

import homeRoutes from './routes/home';

app.use('/', homeRoutes);

app.listen(process.env.PORT);