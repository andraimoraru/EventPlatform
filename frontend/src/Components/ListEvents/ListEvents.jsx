import React, {useEffect, useState} from 'react';
import './ListEvents.css';
import cross_icon from '../../Components/Assets/assets/cross_icon.png';
import { fetchEvents, removeEvent } from '../../API/api';

export const ListEvents = () => {

  const  [isLoading, setIsLoading] = useState(true);
  const [allEvents, setAllEvents] = useState([]);

  const fetchInfo = async () => {
    fetchEvents().then((data) => {setAllEvents(data)});
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    fetchInfo();   
  }, []);

  const remove_event = async (id) => {
    const result = await removeEvent(id);
    if (result === "") {
      fetchInfo();
    }   
  }
  if (isLoading) return <p> Loading ... </p>;

  return (
    <div className='list-events'>
      <h1>All Events List</h1>
      <div className="listevents-format-main">
        <p>Events</p>
        <p>Title</p>
        <p>Price</p>
        <p>Description</p>
        <p>Location</p>
        <p>Remove</p>
      </div>
      <div className="listevents-allevents">
        <hr />
        {allEvents.map((event) => {
          return <React.Fragment key={event.id}>
                  <div className="listevents-format-main listevents-format">
                    <img  src={event.image} className="listevents-events-icon" alt="" />
                    <p>{event.title}</p>
                    <p>£{event.price}</p>
                    <p>{event.description}</p>
                    <p>{event.location}</p>
                    <img onClick={()=> remove_event(event.id)}className="listevents-remove-icon" src={cross_icon} alt="" />
                  </div>
                  <hr />
                  </React.Fragment>
        })}
      </div>
    </div>
  )
}


export default ListEvents