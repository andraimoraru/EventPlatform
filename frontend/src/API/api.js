import axios from 'axios';


export const fetchEvents = async () => {
  try {
    const response = await axios.get("/api/events");
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the events:", error);
    throw error;
  }
};

export const fetchEventByID = async (eventID) => {
    try {
      const response = await axios.get(`/api/events/${eventID}`);
      return response.data[0];
    } catch (error) {
      console.error("There was an error fetching the events:", error);
      throw error;
    }
  };

  export const fetchUsers = async () => {
    try {
        const response = await axios.get(`/api/users`);
        return response.data;
      } catch (error) {
        console.error("There was an error fetching the users:", error);
        throw error;
      }
  }
  

  export const fetchUserByEmail = async (email) => {
    try {
        const response = await axios.get(`/api/users/${email}`);
        return response.data[0];
      } catch (error) {
        console.error("There was an error fetching the user:", error);
        throw error;
      }
  }

  export const addUser = async (user) => {
    try {
      const response = await axios.post("/api/user", user);
      return response.data;
    } catch (error) {
      console.error("There was an error adding the user:", error);
      throw error;
    }

  }

  export const loginUser = async (user) => {
    try {
      const response = await axios.post("/api/login", user);
      return response.data;
    } catch (error) {
      console.error("There was an error fetching the user:", error);
      throw error;
    }
  }

  export const updateBooking = async (email, eventID) => {
    try {
        const response = await axios.patch(`/api/users/${email}/bookEvent`,  eventID );
        return response.data;
    } catch (error) {
        console.error("There was an error updating the user:", error);
        throw error;
    }
};

export const updateStaff = async (email, property) => {
  try {
    const response = await axios.patch(`/api/users/${email}`, property);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the user:", error);
    throw error;
  }
}

export const addEvent = async (event) => {
  try {
    const response = await axios.post(`/api/event`, event);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the event:", error);
    throw error;
  }
}

export const removeEvent = async (id) => {
  try {
    const response = await axios.delete(`/api/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("There was an error fetching the event:", error);
    throw error;
  }

}