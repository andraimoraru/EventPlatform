import React, { useContext, useEffect, useState } from 'react';
import './EventDisplay.css';
import { UserContext } from '../../Context/UserContext';
import {  updateBooking } from '../../API/api';



export const EventDisplay = (event) => {

    const { user, saveUser } = useContext(UserContext);
    const [isBooked, setIsBooked] = useState(false);
   


        useEffect(() => {
            const eventAlreadyBooked = user.eventData?.some(e => e.eventID === event.id);
            setIsBooked(eventAlreadyBooked);
    }, [user, event.id]);


    const eventForCalendar = {
        summary: event.title,
        description: event.description,
        location: event.location,
        startDateTime: event.date_start,
        endDateTime: event.date_end,
    };

    const addToGoogleCalendar = async () => {
        const queryParams = new URLSearchParams(eventForCalendar).toString();  //Passing event as query parameter
        window.location.href = `http://localhost:9090/auth?${queryParams}`;  
    };

    const book_event = async (eventID) => {
        try {
            const updatedUser = await updateBooking(user.email, { eventID: eventID} );
            if (updatedUser) {  
                saveUser(updatedUser)
                setIsBooked(true);  
            }
        } catch (error) {
            console.error("Booking failed:", error);
        }
    };
  return (
    <div className="">
                <div className="eventdisplay">
                <div className='eventdisplay-left'><img className='image' src={event.image} alt="" /></div>
                    <div className="eventdisplay-right">
                        <div className="event_title"><h1>{event.title}</h1></div>        
                        <div className="event_details">
                            <div className="eventlocation">{event.location}</div>
                            <div className="eventprice"> £{event.price}</div>
                        </div>
                        <div className="event_details">
                            <div className="eventstart">{new Date(event.date_start).toUTCString()}</div>
                            <div className="eventend"> {new Date(event.date_end).toUTCString()}</div>
                        </div>
                        {!isBooked ?    (
                                            <button onClick={() => book_event(event.id)}>Book your place now</button>
                                        ) : (
                                            <button onClick={addToGoogleCalendar}>Add to Google Calendar</button>
                                        )}
                    </div>
                </div>
        <div className="event-description"><h1>{event.description}</h1></div>

    </div>

    )
}

export default EventDisplay;