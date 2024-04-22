import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import { fetchEventByID } from '../API/api';
import EventDisplay from '../Components/EventDisplay/EventDisplay';


export const  Event = () => {

  const [event, setEvent] = useState([]);
  const { eventId } = useParams();

  useEffect(() => {
    fetchEventByID(eventId)
    .then((data) => setEvent(data));
  }, []);

  return (
       <EventDisplay key= {event.id} id={event.id} title={event.title} image={event.image} location={event.location} price={event.price} description = {event.description} date_start={event.date_start} date_end={event.date_end}/>
  )
}

export default Event;