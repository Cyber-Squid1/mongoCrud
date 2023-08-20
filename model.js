const mongoose = require('mongoose');

const newSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Email is Required'],
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Login', newSchema)