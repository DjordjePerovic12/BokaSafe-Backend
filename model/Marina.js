const mongoose  = require("mongoose");
const autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const marinaSchema = new Schema(
    {
        id: Number,
        isSelected: Boolean,
        coordinates: { lat: { type: Number, required: true},  lng: { type: Number, required: true} },
        name: String,
      
    }
);

marinaSchema.plugin(autoIncrement, {
    id: "marina_seq", // Unique counter name for marina
    inc_field: "id",
    start_seq: 1
});


module.exports = mongoose.model('Marina', marinaSchema);