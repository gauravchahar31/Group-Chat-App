const sequelize = require('../database/connection');
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
        const messages = await Message.findAll();
        res.status(200).json(messages);
    }
    catch(err){
        console.error(err);
        res.status(400).json(null);
    }
}