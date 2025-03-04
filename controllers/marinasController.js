const Marina = require('../model/Marina');
const multer = require('multer');
const path = require('path');


const getAllMarinas = async(req, res) => {
    const marinas = await Marina.find();
    if(!marinas) return res.status(204).json({'message' : 'No marinas found'});
    res.json(marinas);
};

module.exports = { getAllMarinas }