const { Event } = require("../Schemas/eventSchema")

exports.fetchAllEvents = async () => {
   const events = await Event.find();
   return events;
}

exports.addEvent = async (newEvent) => {
   const eventToAdd = new Event({...newEvent});
   return eventToAdd.save();
}

exports.fetchEventByID = async (id) => {
   const event = await Event.find({id: id})
   return event;
}

exports.removeEventByID = async (id) => {
   const result = await Event.deleteOne({id: id});
   return result;
}