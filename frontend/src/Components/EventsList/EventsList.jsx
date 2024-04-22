import React, { useState, useEffect } from 'react';
import './EventsList.css';
import EventBox from '../EventBox/EventBox';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';
import { fetchEvents } from '../../API/api';

export const EventsList = () => {

  const { user } = useContext(UserContext);
  const [allEvents, setAllEvents] = useState([]);
  const  [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    fetchEvents().then((events) => {setAllEvents(events)})
    setIsLoading(false);
  }, []);

  if (isLoading) return <p> Loading ... </p>;

  return (
    <div className='all-events'>
        <h1>All events</h1>
        <hr />
        <div className="events">
            {allEvents.map((event)=> {
                return <EventBox key= {event.id} id={event.id} title={event.title} image={event.image} location={event.location} price={event.price}/>
            })}
        </div>
    </div>
  )
}

export default EventsList;