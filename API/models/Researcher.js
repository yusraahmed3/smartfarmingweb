const mongoose = require('mongoose')

const researcherSchema = new mongoose.Schema({
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
        required: true
    }
})

module.exports = mongoose.model('Researcher', researcherSchema)