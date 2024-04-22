import React from 'react';
import './AddRemoveStaff.css';
import { useState } from 'react';
import { updateStaff } from '../../API/api';

export const AddRemoveStaff = () => {

  const [email, setEmail] = useState("");


  const changeHandler = e => {
      setEmail(e.target.value);
  }

  const Add_Staff = async () => {
    updateStaff(email, {isStaff: true}).then((user) => {
      if (user ==[]) alert ("User not found!")
      else alert(`User ${user.username} is added as staff`)
      return user;
    })
  }
  
  return (
    <div className='add-staff'>
        <h1> Add/Remove Staff</h1>
        <div className="edit-staff-info">
          <h2>Email: </h2>
          <input type="email" value={email} onChange={changeHandler} name='email' placeholder='Enter user email'/>
          <button onClick={()=>{Add_Staff()}}> Add Staff</button>
        </div>
    </div>
  )
}
export default AddRemoveStaff;