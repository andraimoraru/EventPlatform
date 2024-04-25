import React, {useState} from 'react';
import './AddEvent.css';
import upload_area from '../Assets/assets/upload_area.svg'
import { addEvent } from '../../API/api';

export const AddEvent = () => {

  const [imageToUpload, setImageToUpload] = useState(false);
  const [eventDetails, setEventDetails] = useState({
    title: "",
    description: "",
    location: "",
    date_created: new Date(),
    date_start: "",
    date_end: "",
    price: "",
    category: "Art",
    url: "",
    slots: "",
    attendees: [],
  })

  const imageHandler = (e) => {
    console.log(e.target.files[0])
    setImageToUpload(e.target.files[0]);
  }

  const changeHandler = (e) => {
    e.preventDefault();
    setEventDetails({...eventDetails, [e.target.name]:e.target.value});
  }

  const Add_Event = async () => {

    let event = eventDetails;

    let formData = new FormData();
    formData.append('event',imageToUpload);

  //   const response = await fetch('https://events-sihs.onrender.com/upload', {
  //     method: 'POST',
  //     headers: {
  //       Accept: 'application/json',
  //     },
  //     body: formData,
  // }).catch(error => console.error('Error fetching:', error));
  
  // if (!response.ok) {
  //     console.error('Failed to upload:', response.statusText);
  //     return;
  // }
  
  // const responseData = await response.json();
  // console.log(responseData);


  //   if (responseData.success) {
  //     event.image = responseData.image_url;
  //     console.log(event)
  //     await addEvent(event).then((res) => {
  //       res.status === 201 ?                         
  //                          window.location.replace("/events")
  //                          : alert("Failed to add event")})
  //   } else {
  //     event.image = "";
  //     console.log(event)
  //     await addEvent(event).then((res) => {
  //       res.status === 201 ?                         
  //                          window.location.replace("/events")
  //                          : alert("Failed to add event")})
  //   };


    event.image = "";
    console.log(event);
    await addEvent(event).then((res) => {
        console.log(res);
        res.status === 201 ?                         
                           window.location.replace("/events")
                           : alert("Failed to add event")})
  }

  return (
    <div className='add-event'>
      <div className="addevent-eventfield">
        <p>Event title</p>
        <input type="text" value={eventDetails.title} onChange={changeHandler} name='title' placeholder='Type here'/>
      </div>
      <div className="addevent-eventfield">
          <p>Description</p>
          <input type="text" value={eventDetails.description}  onChange={changeHandler} name='description' placeholder='Type here'/>
      </div>
      <div className="addevent-price">
        <div className="addevent-eventfield">
            <p>Location</p>
            <input type="text" value={eventDetails.location} onChange={changeHandler} name='location' placeholder='Type here'/>
          </div>
          <div className="addevent-eventfield">
            <p>Price</p>
            <input type="text" value={eventDetails.price} onChange={changeHandler} name='price' placeholder='Type here'/>
          </div>
      </div>
      <div className="addevent-price">
        <div className="addevent-eventfield">
            <p>Start date</p>
            <input type="date" value={eventDetails.date_start} onChange={changeHandler} name='date_start' placeholder='Type here'/>
          </div>
          <div className="addevent-eventfield">
            <p>End date</p>
            <input type="date" value={eventDetails.date_end} onChange={changeHandler} name='date_end' placeholder='Type here'/>
          </div>
      </div>
      <div className="addevent-eventfield">
          <p>Slots available</p>
          <input type="text" value={eventDetails.slots}  onChange={changeHandler} name='slots' placeholder='Type here'/>
      </div>
      <div className="addevent-eventfield">
          <p>Online event URL</p>
          <input type="text" value={eventDetails.url}  onChange={changeHandler} name='url' placeholder='Type here'/>
      </div>
      <div className="addevent-eventfield">
        <p>Event category</p>
        <select value={eventDetails.category} onChange={changeHandler} name="category" className='add-event-selector'>
          <option value="music">Music</option>
          <option value="music">Art</option>
          <option value="tech">Tech</option>
          <option value="theatre">Theatre</option>
        </select>
      </div>
      <div className="addeventt-eventfield">
        <label htmlFor="file-input">
             <img src={imageToUpload ? URL.createObjectURL(imageToUpload) : upload_area} className='addevent-thumbnail-img' alt="" />
        </label>  
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden/>      
      </div>
      <button onClick={() => {console.log(eventDetails);  Add_Event()}} className="addevent-btn">ADD</button>
    </div>
  )
}

export default AddEvent;