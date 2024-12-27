const mongoose  = require("mongoose");
const autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;


const documentSchema = new Schema ({
        url: String,
        name: String,
        id: { 
                type: Number,
                unique: true
        }
});

documentSchema.plugin(autoIncrement, {
        inc_field: 'id',     // The field to auto-increment
        start_seq: 1         // Start the sequence from 1
    });

module.exports = mongoose.model('Document', documentSchema);