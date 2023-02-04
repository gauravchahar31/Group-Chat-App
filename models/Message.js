const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const Message = sequelize.define('Message', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNul : false
    },
    message : {
        type : Sequelize.STRING,
        allowNul : false
    },
    name : {
        type : Sequelize.STRING,
        allowNul: false
    }
});

module.exports = Message;