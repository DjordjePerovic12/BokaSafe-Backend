require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnection');
const Lighthouse = require('./model/Lighthouse');
const { populateDB } = require('./seeds/seeds');
const path = require('path');
const createAdminAccount = require('./public/scripts/createAdminAccount');

const PORT = process.env.PORT || 3500;

connectDB();


app.use(cors(corsOptions));

app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));

createAdminAccount();


app.use('/', require('./routes/root'));
app.use('/admin-login', require('./routes/login'));
app.use('/api/lighthouses', require('./routes/api/lighthouses'));

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