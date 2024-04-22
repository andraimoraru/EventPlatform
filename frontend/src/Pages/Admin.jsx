import React, { useContext } from 'react';
import './CSS/Admin.css';
import SideBar from '../Components/SideBar/SideBar.jsx';
import { Routes, Route } from 'react-router-dom';
import ListEvents from '../Components/ListEvents/ListEvents.jsx';
import AddEvent from '../Components/AddEvent/AddEvent.jsx';
import AddRemoveStaff from '../Components/AddRemoveStaff/AddRemoveStaff.jsx';
import { UserContext } from '../Context/UserContext.jsx';


export const Admin = () => {
  const { user } = useContext(UserContext);
  return (
    <div className='admin'>
        <SideBar/>
        <Routes>
          <Route path='/addevent' element={<AddEvent/>}/>
          <Route path='/events' element={<ListEvents/>}/>
          <Route path='/addstaff' element={<AddRemoveStaff/>}/>
        </Routes>
    </div>
  )
}
