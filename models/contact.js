const mongoose = require('mongoose');

const ContactModel = new mongoose.Schema({
    firstName: {
        required:true,
        type: String
    },
    lastName: {
        required:true,
        type: String
    },
    email:{
        required:true,
        type: String
    },
    submitted_date: {type: Date, default: Date.now()},
});

const contactActions = module.exports = mongoose.model('contactActions', ContactModel);

function createContactInfo(req, res){
 if(!req.body.firstName || !req.body.lastName || !req.body.email ){
    res.json({
        success:false,
        message:'Please fill all required fields'
    })
 }else{
     const contactData = {
         'firstName':req.body.firstName,
         'lastName':req.body.lastName,
         'email':req.body.email,
     };
     contactActions.create(contactData, (err) => {
         if(err) throw err;
         res.json({
             success:true
         })
     } )
 }
}

module.exports.createContactInfo = createContactInfo;