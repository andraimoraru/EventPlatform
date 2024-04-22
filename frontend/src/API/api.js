import axios from 'axios';

const base_url = "https://events-sihs.onrender.com"

export const fetchEvents = async () => {
  try {
    const response = await axios.get(`${base_url}/events`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the events:", error);
    throw error;
  }
};

export const fetchEventByID = async (eventID) => {
    try {
      const response = await axios.get(`${base_url}/events/${eventID}`);
      return response.data[0];
    } catch (error) {
      console.error("There was an error fetching the events:", error);
      throw error;
    }
  };

  export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${base_url}/users`);
        return response.data;
      } catch (error) {
        console.error("There was an error fetching the users:", error);
        throw error;
      }
  }
  

  export const fetchUserByEmail = async (email) => {
    try {
        const response = await axios.get(`${base_url}/users/${email}`);
        return response.data[0];
      } catch (error) {
        console.error("There was an error fetching the user:", error);
        throw error;
      }
  }

  export const addUser = async (user) => {
    try {
      const response = await axios.post(`${base_url}/user`, user);
      return response.data;
    } catch (error) {
      console.error("There was an error adding the user:", error);
      throw error;
    }

  }

  export const loginUser = async (user) => {
    try {
      const response = await axios.post(`${base_url}/login`, user);
      return response.data;
    } catch (error) {
      console.error("There was an error fetching the user:", error);
      throw error;
    }
  }

  export const updateBooking = async (email, eventID) => {
    try {
        const response = await axios.patch(`${base_url}/users/${email}/bookEvent`,  eventID );
        return response.data;
    } catch (error) {
        console.error("There was an error updating the user:", error);
        throw error;
    }
};

export const updateStaff = async (email, property) => {
  try {
    const response = await axios.patch(`${base_url}/users/${email}`, property);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the user:", error);
    throw error;
  }
}

export const addEvent = async (event) => {
  try {
    const response = await axios.post(`${base_url}/event`, event);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the event:", error);
    throw error;
  }
}

export const removeEvent = async (id) => {
  try {
    const response = await axios.delete(`${base_url}/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the event:", error);
    throw error;
  }

}