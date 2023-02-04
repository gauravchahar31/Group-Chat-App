const sequelize = require('../database/connection');
const Message = require('../models/Message');

exports.newMessage = async (req, res) => {
    try{
        const saveMessage = await req.user.createMessage({
            message: req.body.message
        })
        console.log(saveMessage);
    }
    catch(err){
        console.error(err);
        res.status(400).json(null);
    }
}