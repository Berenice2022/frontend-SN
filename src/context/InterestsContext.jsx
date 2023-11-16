import { createContext, useContext, useState } from 'react';
import {
  createInterestRequest,
  getInterestsRequest,
  deleteInterestRequest,
  getInterestRequest,
  updateInterestRequest,
} from '../api/interests.js';

const InterestContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useInterests = () => {
  const context = useContext(InterestContext);
  if (!context) {
    throw new Error('useInterests must be used within a Interest Provider');
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export function InterestProvider({ children }) {
  const [interests, setInterests] = useState([]);

  const getInterests = async () => {
    try {
      const res = await getInterestsRequest();
      setInterests(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createInterest = async (interest) => {
    try {
      await createInterestRequest(interest);
      getInterests();
      // console.log(interest);
    } catch (error) {
      console.log(error);
    }
  }; //Fin de createInterest

  const deleteInterest = async (id) => {
    try {
      const res = await deleteInterestRequest(id);
      // console.log(res.status);
      if (res.status == 200)
        setInterests(interests.filter((interest) => interest._id != id));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getInterest = async (id) => {
    try {
      const res = await getInterestRequest(id);
      //console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const updateInterest = async (id, interest) => {
    try {
      const res = await updateInterestRequest(id, interest);
      console.log(res);
      getInterests();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <InterestContext.Provider
      value={{
        interests,
        createInterest,
        getInterests,
        deleteInterest,
        getInterest,
        updateInterest,
      }}
    >
      {children}
    </InterestContext.Provider>
  );
}
