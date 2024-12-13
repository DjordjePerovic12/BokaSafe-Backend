require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnection');
const Lighthouse = require('./model/Lighthouse');
const { populateDB } = require('./seeds/seeds');

const PORT = process.env.PORT || 3500;

connectDB();


app.use(cors(corsOptions));

app.use(express.json());

app.use('/lighthouses', require('./routes/lighthouses.js'));

mongoose.connection.once('open', async () => {
    console.log('Connected to MongoDB');


    const lighthouseCount = await Lighthouse.countDocuments({});
    if (lighthouseCount === 0) {
        console.log('No lighthouses found. Populating database....');
        await populateDB();
    } else {
        console.log('Lighthouses already exist in the database.');

    }


    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
})