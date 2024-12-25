const Lighthouse = require('../model/Lighthouse');
const admin = require('../config/firbease');


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

    try {
        const payload = {
            data: {
                title: "Lighthouse Status Updated",
                body: `The status of Lighthouse ${lighthouse.name} has been changed to ${lighthouse.status}.`,
            }
        };

        // Replace this with a topic or device tokens
        const topic = "lighthouse_updates";

        await admin.messaging().send({
            topic,
            ...payload,
        });
        console.log("Push notification sent successfully.");
    } catch (error) {
        console.error("Error sending notification:", error);
    }

    res.status(201).json(result);
};


module.exports = { getAllLighthouses, editLighthouse, getLighthouseById }