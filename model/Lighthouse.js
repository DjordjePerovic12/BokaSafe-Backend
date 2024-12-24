const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lighthouseSchema = new Schema(
    {
        id: Number,
        name: String,
        latitude: Number,
        longitude: Number,
        isSelected: Boolean,
        status: {
            type: String,
            default: 'OK'
        },
        characteristics: String
    }
)

module.exports = mongoose.model('Lighthouse', lighthouseSchema);