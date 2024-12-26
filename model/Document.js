const mongoose  = require("mongoose");
const Schema = mongoose.Schema;


const documentSchema = new Schema ({
        url: String
});

module.exports = mongoose.model('Document', documentSchema);