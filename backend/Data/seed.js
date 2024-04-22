const {User} = require("../Schemas/userSchema");
const {Event} = require('../Schemas/eventSchema')

exports.seed = async (users, events) => {
  try {
    await User.collection.drop();
    await User.insertMany(users);
    await Event.collection.drop();
    await Event.insertMany(events)
  } catch (err) {
    console.log(err);
  }
}
