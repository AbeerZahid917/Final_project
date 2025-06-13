const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/netflix";

const connectToMongo = async () => {
    try 
    {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to Mongo Successfully");
    } 
    catch (err) 
    {
        console.error("MongoDB connection failed:", err);
    }
};

module.exports = connectToMongo;