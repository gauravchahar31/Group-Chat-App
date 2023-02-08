const sequelize = require('../database/connection');
const { Op } = require("sequelize");
const User = require('../models/User');
const Group = require('../models/Group');
const Message = require('../models/Message');
const Admin = require('../models/Admin');
const GroupUser = require('../models/GroupUser');

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

exports.checkGroupUser = async (req, res) => {
    try{
        const isParticipant = await GroupUser.findOne({
            where: {
                chatGroupId: req.query.groupId,
                userId: req.query.userId
            },
            attributes: ['chatGroupId', 'userId']
        })
        if(isParticipant){
            res.status(200).send(true);
        }else{
            res.status(200).send(false);
        }
    }
    catch(err){
        console.error(err);
        res.status(400).json(null);
    }
}

exports.removeFromGroup = async (req, res) => {
    try{
        await GroupUser.destroy({
            where: {
                chatGroupId: req.body.chatGroupId,
                userId: req.body.userId
            }
        });
        res.status(200).send('Successful');
    }
    catch(err){
        console.error(err);
        res.status(400).json(null);
    }
}

exports.addNewGroupUser = async (req, res) => {
    try{
        const group = await Group.findOne({
            where: {
                id: req.body.chatGroupId
            }
        });
        await group.addUser(req.body.userId, {through: 'GroupUsers'});
        res.status(200).send('Successful');
    }
    catch(err){
        console.error(err);
        res.status(400).json(null);
    }
}