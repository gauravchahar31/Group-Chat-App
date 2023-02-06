const sequelize = require('../database/connection');
const { Op } = require("sequelize");
const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
    try{
        console.log(req.query);
        const messages = await Message.findAll({
            where: {
                chatGroupId : req.query.groupId,
                id: {
                    [Op.gt]: req.query.lastMessage
                }
            }
        });
        res.status(200).json(messages);
    }
    catch(err){
        console.error(err);
        res.status(400).json(null);
    }
}

exports.getlastMessage = async (req, res) => {
    try{
        const groupId = parseInt(req.query.groupId);
        const lastMessage = await Message.findAll({
            where: {
                chatGroupId: groupId
            },
            order: [[ 'createdAt', 'DESC' ]],
            limit: 1
        })
        res.status(200).json(lastMessage);
    }
    catch(err){
        console.log(err);
    }
}

exports.getGroupMessages = async(req, res) => {
    try{
        const groupMessages = await Message.findAll({
            where: {
                chatGroupId: req.params.groupId
            },
            limit: 10
        })
        const data = {
            groupMessages,
            user : req.user.id
        }
        res.status(200).json(data);
    }
    catch(err){
        console.error(err);
        res.status(400).json(null);
    }
}

exports.newGroupMessage =  async(req, res) => {
    try{
        const newMessage = await req.user.createMessage({
            name: req.user.name,
            message: req.body.message,
            chatGroupId: req.body.chatGroupId
        });
    }
    catch(err){
        console.log(err);
    }
}