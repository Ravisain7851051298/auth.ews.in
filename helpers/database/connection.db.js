const mongoose = require('mongoose');
module.exports = async function connectToDB() {
    if (!process.env.MONGODB_CONNECT_CLOUD) {
        throw new Error('MONGODB_CONNECT_CLOUD environment variable is not set');
    }
    try {
        await mongoose.connect(process.env.MONGODB_CONNECT_CLOUD);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};