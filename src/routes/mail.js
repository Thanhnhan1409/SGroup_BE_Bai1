/* eslint-disable no-undef */
const express = require('express');
require('dotenv').config();
const mail_router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mailService = require('../services/mailServices');
const { getUserByData } = require('../database/userQuery');
const hashPassword = require('../middleware/hashPassword');
const knex = require('../database/connection');


mail_router.post('/forgot-password', async (req, res) => {
    const email = req.body.email;
    const user = await getUserByData('email', email);

    if (!user) {
        return res.status(404).json({
            status: 'failed',
            message: 'Not found email1!',
        });
    }

    try {
        const email = mailService.sendMail({
            emailTo: user.email,
        });
        if (!email) {
            return res.status(400).json({
                status: 'failed',
                message: 'Error occurred while sending email',
            });
        }
        return res.status(200).json({
            status: 'success',
            message: 'Sent mail successfully',
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'failed',
            message: 'Error occurred while sending email',
        });
    }
});

mail_router.post('/reset-password', async function (req, res) {
    const { email, token, password } = req.body;

    const user = await getUserByData('email', email);
    if (!user) {
        return res.status(400).json({
            status: 'failed',
            message: 'Not found user!',
        });
    }

    const decodeToken = jwt.verify(token, process.env.SECRET);
    if (!decodeToken) {
        return res.status(401).json({
            status: 'failed',
            message: 'Invalid Token',
        });
    } else {
        const salt = crypto.randomBytes(16).toString('hex');
        //Hash with Salt
        const hashedPassword = hashPassword(password, salt);
        await knex('Users')
            .where('email', email)
            .update({ password: hashedPassword.pass, salt: salt });

        return res.status(200).json({
            status:'success',
            message:'Change password successfuly!'
        })    
        
    }
});

module.exports = mail_router;
