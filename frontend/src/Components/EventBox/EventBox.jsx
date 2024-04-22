import React from 'react'
import './EventBox.css';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';


export const EventBox = (props) => {

  const { user } = useContext(UserContext);

  return (
    <div className='event'>
        <Link to={`/event/${props.id}`} key={props.id} id = {props.id} ><img onClick={window.scrollTo(0,0)} src={props.image} alt="" /></Link>
        <div className='event-title'>{props.title}</div>
        <div className="event-details">
            <div className="event-location">
                {props.location}
            </div>
            <div className="event-price">
                £{props.price}
            </div>
        </div>
    </div>
  )
}

export default EventBox;