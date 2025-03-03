const mongoose  = require("mongoose");
const autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;


const documentSchema = new Schema ({
        url: String,
        name: String,
        id: Number,
               
        
});

documentSchema.plugin(autoIncrement, {
        id: "document_seq", // Unique counter name for Document
        inc_field: "id",
        start_seq: 1
    });

module.exports = mongoose.model('Document', documentSchema);