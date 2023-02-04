const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const sequelize = require('./database/connection');
const homeRoutes = require('./routes/home');
const userRoutes = require('./routes/user');

app.use((req, res, next) => {
    if(req.cookies.user){
        req.user = req.cookies.user;
    }
    next();
})

app.use('/user', userRoutes);
app.use(homeRoutes);


sequelize.sync();

app.listen(process.env.PORT_NUMBER, () => {
    console.log(`Server started running at : ${process.env.PORT_NUMBER}`);
});