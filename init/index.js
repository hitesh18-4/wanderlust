if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const User = require("../models/user.js");

const dbUrl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
    initDB();
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dbUrl);
}

const initDB = async () => {
  // create (or reuse) a demo user that owns all seeded listings
  let demoUser = await User.findOne({ username: "demo" });
  if (!demoUser) {
    demoUser = await User.register(
      new User({ username: "demo", email: "demo@wanderlust.com" }),
      "demopassword"
    );
    console.log('Created demo user -> username: "demo", password: "demopassword"');
  }

  await Listing.deleteMany({});

  const listingsWithOwner = initData.data.map((listing) => ({
    ...listing,
    owner: demoUser._id,
  }));

  await Listing.insertMany(listingsWithOwner);
  console.log("data was initialized");
  mongoose.connection.close();
};
