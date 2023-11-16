import { createContext, useContext, useState } from 'react';
import {
  createEventRequest,
  getEventsRequest,
  deleteEventRequest,
  getEventRequest,
  updateEventRequest,
} from '../api/events';

const EventContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useEvents = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error('useEvents must be used within a Event Provider');
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);

  const getEvents = async () => {
    try {
      const res = await getEventsRequest();
      setEvents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createEvent = async (event) => {
    try {
      await createEventRequest(event);
      getEvents();
      // console.log(event);
    } catch (error) {
      console.log(error);
    }
  }; //Fin de createEvent

  const deleteEvent = async (id) => {
    try {
      const res = await deleteEventRequest(id);
      // console.log(res.status);
      if (res.status == 200)
        setEvents(events.filter((event) => event._id != id));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getEvent = async (id) => {
    try {
      const res = await getEventRequest(id);
      //console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateEvent = async (id, event) => {
    try {
      const res = await updateEventRequest(id, event);
      console.log(res);
      getEvents();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        createEvent,
        getEvents,
        deleteEvent,
        getEvent,
        updateEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}
