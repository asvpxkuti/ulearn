const express = require('express');
const router = express.Router();
const contact = require('../models/contact');
const nodemailer = require('nodemailer');


router.post('/create',function(req,res){
    contact.createContactInfo(req,res);
});

module.exports = router;