const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express()
const server = require('http').createServer(app)

const io = require('socket.io')(server);
io.on('connection', socket => {
    socket.on('send-message', room => {
        io.emit('receive-message', room);
    });
})

app.use(cors());
app.use(express.static('views'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

const sequelize = require('./database/connection');
const User = require('./models/User');
const Message = require('./models/Message');
const Group = require('./models/Group');
const Admin = require('./models/Admin');

const homeRoutes = require('./routes/home');
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const groupRoutes = require('./routes/group');
const adminRoutes = require('./routes/admin');

app.use(async (req, res, next) => {
    if(req.cookies.user){
        req.user = await User.findOne({
            where : {
                jwt : req.cookies.user
            }
        });
    }
    next();
})

app.use('/user', userRoutes);
app.use('/message', messageRoutes);
app.use('/group', groupRoutes);
app.use('/admin', adminRoutes);
app.use(homeRoutes);

Group.belongsToMany(User, {through: 'GroupUsers'});
User.belongsToMany(Group, {through: 'GroupUsers'})

Message.belongsTo(Group, {constraints: true, onDelete: 'CASCADE'});
Message.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Message);
Group.hasMany(Message);

sequelize.sync();

server.listen(3000);