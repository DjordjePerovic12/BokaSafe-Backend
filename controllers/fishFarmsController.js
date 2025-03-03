const FishFarm = require('../model/FishFarm');
const multer = require('multer');
const path = require('path');


const getAllFishFarms = async(req, res) => {
    const fishFarms = await FishFarm.find();
    if(!fishFarms) return res.status(204).json({'message' : 'No fishFarms found'});
    res.json(fishFarms);
};

module.exports = { getAllFishFarms }