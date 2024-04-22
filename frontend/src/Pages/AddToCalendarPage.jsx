import React from 'react';
import { useLocation } from 'react-router-dom';
import { AddToCalendar }  from 'add-to-calendar-button-react';  // Corrected import statement

const AddToCalendarPage = () => {
    const { state } = useLocation();  // Receive state passed from navigate function
    const { event } = state;

    const eventForCalendar = {
        name: event.title,
        details: event.description,
        location: event.location,
        startsAt: event.date_start,  // Make sure these are in proper ISO string format
        endsAt: event.date_end,
        options: ['Google', 'Apple', 'Outlook', 'Yahoo', 'iCal'],
    };

    return (
        <div>
            <h1>Add Event to Calendar</h1>
            <AddToCalendar event={eventForCalendar} />
        </div>
    );
};

export default AddToCalendarPage;