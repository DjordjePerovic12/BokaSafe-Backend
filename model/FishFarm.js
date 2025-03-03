const mongoose  = require("mongoose");
const autoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

const fishFarmSchema = new Schema(
    {
        isSelected: Boolean,
        centralCoordinate: { lat: { type: Number, required: true},  
        lng: { type: Number, required: true} },
    coordinates: [
        {
          lat: { type: Number, required: true},  
          lng: { type: Number, required: true} 
        }
      ],
      id: Number,
    }
);

fishFarmSchema.plugin(autoIncrement, {
    id: "fishfarm_seq", // Unique counter name for FishFarm
    inc_field: "id",
    start_seq: 1
});


module.exports = mongoose.model('FishFarm', fishFarmSchema);