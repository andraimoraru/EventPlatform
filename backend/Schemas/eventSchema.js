const mongoose = require("mongoose");

const Event = mongoose.model("Event", {
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    date_created: {
        type: Date,
        default: Date.now(),
    },
    date_start: {
        type: Date,
        required: true,
    },
    date_end: {
        type: Date,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    url: {
        type: String,
    },
    slots: {
        type: Number,
        required: true,
    },
    attendees: {
        type: Object,
        default: [],
    } 
})
module.exports = {Event}
