const { fetchAllEvents, addEvent, fetchEventByID, removeEventByID } = require("../Models/eventModel")


exports.getAllEvents = (req, res, next) => {
    fetchAllEvents().then((data) => {
        res.status(200).send(data)
    }).catch(next)
}

exports.postEvent = (req, res, next) => {
    let id;
    fetchAllEvents().then((data) => {
        const events = [...data]
        if (events.length > 0 ) {
            let last_event_array = events.slice(-1);
            let last_event = last_event_array[0];
            id = last_event.id + 1;
        } else id = 1;
        return id;
    }).then((id) => {
        const event = {
            id: id,
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            date_created: new Date(),
            date_start: req.body.date_start,
            date_end: req.body.date_end,
            price: req.body.price,
            image: req.body.image,
            category: req.body.category,
            url: req.body.url,
            slots: req.body.slots,
            attendees: [],
        };
        addEvent(event).then((data) => {
            res.status(201).send({addedEvent: data, status: 201})
        }).catch(next)
    })
};

exports.getEventByID = (req, res, next) => {
    
    const id  = req.params.eventID;

    if (!id) {
        return res.status(400).send({status: 400, msg : 'ID invalid'});
    };

    if (!/^\d+$/.test(id)) {
        return res.status(400).send({status: 400, msg : 'ID invalid'});
    };

    if (id > 0) {
        fetchEventByID(id).then((data) => {
            if (data.length > 0) {
                res.status(200).send(data) 
            } else res.status(404).send({status: 404, msg : 'ID not found'})            
    }).catch(next)
    }
}

exports.deleteEventByID = (req, res, next) => {
    const  id   = req.params.eventID;
    removeEventByID(id).then((result) => {
        if (result.deletedCount === 0) {
            res.status(404).send({ status: 404, message: "ID Not Found" });
        }
        else {
        res.status(204).send({ status: 204, message: "Event deleted" })
        }

    }).catch(next)

}
