const Lighthouse = require('../model/Lighthouse');


const getAllLighthouses = async(req, res) => {
    const lighthouses = await Lighthouse.find();
    if(!lighthouses) return res.status(204).json({'message' : 'No lighthouses found'});
    res.json(lighthouses);
};


const getLighthouseById = async (req, res) => {
    if(!req?.params.id) {
        return res.status(400).json({'message' : 'ID parameter is required'})
    }
   const lighthouse = await Lighthouse.findOne({
        id: req.params.id
   });
    if(!lighthouse) {
        res.status(204).json({'message' : 'Lighthouse does not exist'});
    }
    res.json(lighthouse);
}


const editLighthouse = async(req, res) => {
    if(!req.body.id) {
        return res.status(400).json({'message' : 'ID parameter is required!'});
    }
    const lighthouse = await Lighthouse.findOne({
        id: req.body.id
    });

    if(!lighthouse) {
        return res.status(204).json({'message' : 'Lighthouse not found'});
    }

    if(req.body?.status) lighthouse.status = req.body.status;
    const result = await lighthouse.save();

    res.status(201).json(result);
};


module.exports = { getAllLighthouses, editLighthouse, getLighthouseById }