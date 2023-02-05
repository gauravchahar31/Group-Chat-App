const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const Group = sequelize.define('chatGroup', {
    id : {
        type : Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNul : false
    },
    name : {
        type : Sequelize.STRING,
        allowNul : false
    }
});

module.exports = Group;