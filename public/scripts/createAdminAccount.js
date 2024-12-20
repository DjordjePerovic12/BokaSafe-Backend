const User = require("../../model/User");
const bcrypt = require('bcryptjs');


async function createAdminAccount() {
    try {
        const existingAdmin = await User.findOne({ username: "admin@bokasafe.com" });
        if(!existingAdmin) {
            const newAdmin = new User({
                username: "admin@bokasafe.com",
                password: await bcrypt.hash("admin123", 10)
            });
            await newAdmin.save();
            console.log("Admin account created successfully");
        } else {
            console.log("Admin already exists.")
        }
    } catch (error) {
        console.error(error.message);
        }
}

module.exports = createAdminAccount;