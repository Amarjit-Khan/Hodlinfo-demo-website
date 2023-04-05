const mongoose = require('mongoose');

const { Schema } = mongoose;

const infoSchema = new Schema({
    index: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    last: {
        type: Number,
        required: true
    },
    buy: {
        type: Number,
        required: true
    },
    sell: {
        type: Number,
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
    base_unit: {
        type: String,
        required: true
    }
});

const HODinfo = mongoose.model('HODinfo', infoSchema)
module.exports = HODinfo