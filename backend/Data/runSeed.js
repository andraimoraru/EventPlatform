const users = require("../Data/devData/usersData");
const events = require("../Data/devData/eventsData")
const { seed } = require("../Data/seed");
const mongoose = require("mongoose");
require("dotenv").config();

const runSeed = async () => {
  await mongoose.connect(process.env.DATABASE_URL);
  return seed(users, events).then(() => mongoose.connection.close());
};

runSeed();
