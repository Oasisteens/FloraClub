const mongoose = require("mongoose");

module.exports = async function connection() {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        await mongoose.connect(process.env.DB, connectionParams);
        console.log("Connected to Mongodb");
    } catch (error) {
        console.log(error);
        console.log("Error connected to Mongodb");
    }
};