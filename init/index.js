const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

// Connect to MongoDB
const Mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
    await mongoose.connect(Mongo_URL);
};

main().then(() => {
    console.log("Connected to DB");
}).catch(err => {
    console.log(err);
});

const initDB = async () => {
    // Drop existing collections
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: "67c938553ed7a27f3d0359c0" }));
    await Listing.insertMany(initData.data);
    console.log("Database initialized");
};

initDB();