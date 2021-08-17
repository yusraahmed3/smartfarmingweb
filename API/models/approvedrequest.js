const mongoose = require('mongoose')

const approvedrequestSchema = new mongoose.Schema({
    status: {
        type: String,
        required: true,
        default: 'pending'

    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phoneno: {
        type: Number,
        required: true
    },
    instname: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    idimg: {
        type: String,
    }
   
})

module.exports = mongoose.model('Approved', approvedrequestSchema)