const mongoose = require("mongoose");

const User = mongoose.model('User', {
    username: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        default: "",
    },
    lastName: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    eventData: {
        type: Object,
        default: [],
    },
    isStaff: {
        type: Boolean,
        default: false,
    }
})

module.exports = {User}
