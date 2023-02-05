const sequelize = require('../database/connection');
const { Op } = require("sequelize");
const Message = require('../models/Message');

exports.newMessage = async (req, res) => {
    try{
        const saveMessage = await req.user.createMessage({
            message: req.body.message,
            name: req.user.name
        })
    }
    catch(err){
        console.error(err);
        res.status(400).json(null);
    }
}

exports.getMessages = async (req, res) => {
    try{
        console.log(req.params.lastMessage);
        if(req.params.lastMessage == 0){
            const messages = await Message.findAll({
                order: [[ 'createdAt', 'DESC' ]],
                limit: 2
            });
            res.status(200).json(messages);
        }
        else{
            const messages = await Message.findAll({
                where: {
                    id: {
                        [Op.gt]: req.params.lastMessage
                    }
                }
            });
            res.status(200).json(messages);
        }
    }
    catch(err){
        console.error(err);
        res.status(400).json(null);
    }
}