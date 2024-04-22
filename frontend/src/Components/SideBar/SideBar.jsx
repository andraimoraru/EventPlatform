import React from 'react';
import "./SideBar.css";
import { Link } from 'react-router-dom';
import add_event_icon from '../../Components/Assets/assets/Event_Cart.svg';
import list_events_icon from '../../Components/Assets/assets/Events_list_icon.svg';

export const SideBar = () => {
  return (
    <div className='sidebar'>
        <Link to = {'./addevent'} style={{textDecoration:"none"}}>
            <div className="sidebar-event">
                <img src={add_event_icon} alt="" />
                <p>Add Event</p>
            </div>
        </Link>
        <Link to = {'./events'} style={{textDecoration:"none"}}>
            <div className="sidebar-event">
                <img src={list_events_icon} alt="" />
                <p>Events list</p>
            </div>
        </Link>
        <Link to = {'./addstaff'} style={{textDecoration:"none"}}>
            <div className="sidebar-event">
                <img src={add_event_icon} alt="" />
                <p>Add Staff</p>
            </div>
        </Link>

    </div>
  )
}


export default SideBar;