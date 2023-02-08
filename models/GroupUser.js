const Sequelize = require('sequelize');
const sequelize = require('../database/connection');

const GroupUser = sequelize.define('GroupUser', {
    chatGroupId : {
        type : Sequelize.INTEGER,
        allowNul : false
    },
    userId : {
        type: Sequelize.INTEGER,
        allowNul : false
    }
}, {
    timestamps: false
});

module.exports = GroupUser;