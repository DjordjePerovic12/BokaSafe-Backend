const Lighthouse = require('../model/Lighthouse');


const getAllLighthouses = async(req, res) => {
    const lighthouses = await Lighthouse.find();
    if(!lighthouses) return res.status(204).json({'message' : 'No lighthouses found'});
    res.json(lighthouses);
};


module.exports = { getAllLighthouses }