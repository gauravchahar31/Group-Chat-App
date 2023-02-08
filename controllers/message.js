const sequelize = require('../database/connection');
const { Op } = require("sequelize");
const Message = require('../models/Message');
const awsS3 = require('../util/aws');

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
        res.status(500).json(null);
    }
}

exports.saveFile = async (req, res) => {
    try{
        console.log(req.body);
        // const file = req.body.file[0];
        // const fileName = `file${req.user.id}${new Date()}`;
        // const fileURL = await saveFileToS3(file, fileName);
        // console.log(fileURL);
        // res.status(200).send(fileURL);

        // await req.user.createMessage({
        //     name: req.user.name,
        //     message: fileURL,
        //     chatGroupId: req.body.groupId
        // });
    }
    catch(err){
        console.log(err);
        res.status(500).json(null);
    }
}

const saveFileToS3 = async (data, fileName) => {
    try{
        return new Promise ((resolve, reject) => {
            awsS3.createBucket(() => {
                const params = {
                    Bucket : 'expensetracker-reports',
                    Key : fileName,
                    Body : data,
                    ACL: 'public-read'
                }
                awsS3.upload(params, (err, response) => {
                    if(err){
                        console.log(err);
                        reject(err);
                    }else{
                        console.log(response);
                        resolve(response.Location);
                    }
                })
            });
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json(null);
    }
}