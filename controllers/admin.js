const sequelize = require('../database/connection');
const { Op } = require("sequelize");
const User = require('../models/User');
const Group = require('../models/Group');
const Admin = require('../models/Admin');

exports.makeGroupAdmin = async (req, res) => {
    try{
        await Admin.create({
            chatGroupId: req.body.chatGroupId,
            userId: req.user.id
        })
        res.status(200).send('Successful');
    }
    catch(err){
        console.log(err)
        res.status(500);
    }
}

exports.checkAdmin = async (req, res) => {
    try{
        let userId;
        if(req.query.userId){
            userId = req.query.userId;
        }else{
            userId = req.user.id;
        }
        
        const groupAdmins = await Admin.findAll({
            where : {
                chatGroupId: req.query.groupId,
                userId: userId
            }
        })

        if(groupAdmins[0]){
            res.status(200).send(true);
        }else{
            res.status(200).send(false);
        }
    }
    catch(err){
        console.log(err)
        res.status(500);
    }
}

exports.getGroupAdmins = async (req, res) => {
    try{
        const groupAdmins = await Admin.findAll({
            where : {
                chatGroupId: req.query.groupId,
            }
        });
        res.status(200).send(groupAdmins);
    }
    catch(err){
        console.log(err)
        res.status(500);
    }
}

exports.createNewAdmin = async (req, res) => {
    try{
        await Admin.create({
            chatGroupId: req.body.chatGroupId,
            userId: req.body.userId
        })
        res.status(200).send('Successful');
    }
    catch(err){
        console.log(err)
        res.status(500);
    }
}

exports.removeAdmin = async (req, res) => {
    try{
        await Admin.destroy({
            where: {
                chatGroupId: req.body.chatGroupId,
                userId: req.body.userId
            }
        })
        res.status(200).send('Successful');
    }
    catch(err){
        console.log(err)
        res.status(500);
    }
}

