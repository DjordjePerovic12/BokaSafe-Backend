require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConnection');
const Lighthouse = require('./model/Lighthouse');
const Document = require('./model/Document');
const FishFarm = require('./model/FishFarm');
const { populateDB } = require('./seeds/seeds');
const path = require('path');
const createAdminAccount = require('./public/scripts/createAdminAccount');
const fs = require('fs');
const MarineProtectedArea = require('./model/MarineProtectedArea');
const Marina = require('./model/Marina')

const PORT = process.env.PORT || 3500;

connectDB();

const uploadsDir = path.join(__dirname, 'uploads');

// Check if the uploads directory exists
if (!fs.existsSync(uploadsDir)) {
    // If it doesn't exist, create it
    fs.mkdirSync(uploadsDir, { recursive: true, mode: 0o777 });
    console.log('Uploads directory created.');
} else {
    console.log('Uploads directory already exists.');
}


app.use(cors(corsOptions));

app.use(express.json());

app.use(express.static(path.join(__dirname, '/public')));
app.use('/uploads', express.static(uploadsDir));
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: err.message });
    }
    next(err);  // Pass to the next error handler
});

createAdminAccount();


app.use('/', require('./routes/root'));
app.use('/api/lighthouses', require('./routes/api/lighthouses'));
app.use('/admin-login', require('./routes/login'));
app.use('/refresh', require('./routes/refresh'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/api/documents', require('./routes/api/documents'));
app.use('/api/fishfarms', require('./routes/api/fishfarms'));
app.use('/api/marineProtectedAreas', require('./routes/api/marineProtectedAreas'));
app.use('/api/marinas', require('./routes/api/marinas'));


mongoose.connection.once('open', async () => {
    console.log('Connected to MongoDB');

    // Check if collections already contain data
    const lighthouseCount = await Lighthouse.countDocuments({});
    const fishFarmCount = await FishFarm.countDocuments({});
    const marineProtectedAreaCount = await MarineProtectedArea.countDocuments({});
    const marinaCount = await Marina.countDocuments({});

    if (lighthouseCount === 0 && fishFarmCount === 0 && marineProtectedAreaCount === 0 && marinaCount === 0) {
        console.log('Database is empty. Populating database...');
        await populateDB();
    } else {
        console.log('Database already contains data. Skipping population.');
    }

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
