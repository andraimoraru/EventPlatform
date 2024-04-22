import React, { useEffect, useState, useContext } from 'react';
import './CSS/Account.css';
import { UserContext } from '../Context/UserContext';
import { fetchEventByID } from '../API/api';
import EventBox from '../Components/EventBox/EventBox';

export const Account = () => { 
  const { user } = useContext(UserContext);
  const [bookedEvents, setBookedEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {

      if(user.eventData && user.eventData.length > 0) {
        try {
          const eventsPromises = user.eventData.map(event => 
            fetchEventByID(event.eventID));
          const events = await Promise.all(eventsPromises);
          setBookedEvents(events);
        } catch (error) {
          console.error('Failed to fetch events:', error);
        }
      }
      setIsLoading(false);
    };
    fetchEvents();
  }, [user]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <>             
      <div>
        <h1>Hello, {user.username}!</h1>
      </div>
      <div>
        <h2>Your booked events</h2>
      </div>
      <div className="events">
        {bookedEvents.length > 0 ? (
          bookedEvents.map((event) => (
            <EventBox key={event.id} {...event} />
          ))
        ) : (
          <p>No booked events found.</p>
        )}
      </div>
    </>
  );
};

export default Account;