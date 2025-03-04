const mongoose  = require("mongoose");
const autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const marineProtectedAreaSchema = new Schema(
    {
        name: String,
        isSelected: Boolean,
        mpaSymbolCoordinate: { lat: { type: Number, required: true},  lng: { type: Number, required: true} },
        anchoringProhibitedCoordinate: { lat: { type: Number, required: true},  lng: { type: Number, required: true} },
        fishingProhibited : { lat: { type: Number, required: true},  lng: { type: Number, required: true}}
       ,
    coordinates: [
        {
          lat: { type: Number, required: true},  
          lng: { type: Number, required: true} 
        }
      ],
      id: Number,
    }
);

marineProtectedAreaSchema.plugin(autoIncrement, {
    id: "marineProctectedArea_seq", // Unique counter name for MarineProtectedArea
    inc_field: "id",
    start_seq: 1
});


module.exports = mongoose.model('MarineProtectedArea', marineProtectedAreaSchema);