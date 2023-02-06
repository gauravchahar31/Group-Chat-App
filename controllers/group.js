const sequelize = require('../database/connection');
const { Op } = require("sequelize");
const User = require('../models/User');
const Group = require('../models/Group');
const Message = require('../models/Message');

exports.createGroup = async (req, res) => {
    try{
        const newGroup = await Group.create({
            name: req.body.name,
        });

        const groupUsers = req.body.users;
        groupUsers.push(req.user.id);

        groupUsers.forEach(async userId => {
            await newGroup.addUser(userId, {through: 'GroupUsers'});
        })

        console.log(newGroup);
        res.status(200).json(newGroup);
        
    }
    catch(err){
        console.error(err);
        res.status(400).json(null);
    }
}

exports.getUserGroups = async (req, res) => {
    try{
        const user = req.user;
        const userGroups = await User.findOne({
            where: {
                id: req.user.id
            },
            include: {
                model: Group
            }
        })
        res.status(200).json(userGroups);
    }
    catch(err){
        console.error(err);
        res.status(400).json(null);
    }
}