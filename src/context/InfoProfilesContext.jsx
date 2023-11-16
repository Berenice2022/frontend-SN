import {createContext, useContext, useState} from 'react';
import {createInfoProfileRequest, 
    getInfoProfilesRequest,
    deleteInfoProfileRequest,
    getInfoProfileRequest,
    updateInfoProfileRequest } from '../api/infoprofiles';

const InfoProfileContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useInfoProfiles = () => {
    const context = useContext(InfoProfileContext);
    if(!context){
        throw new Error("useInfoProfiles must be used within a InfoProfile Provider");
    }
    return context;
}

// eslint-disable-next-line react/prop-types
export function InfoProfileProvider({ children }) {
    const [infoprofiles, setInfoProfiles] = useState([]);

    const getInfoProfiles = async () => {
        try{
            const res = await getInfoProfilesRequest();
            setInfoProfiles(res.data);
        }catch (error){
            console.error(error);
        }
    };

    const createInfoProfile = async (infoprofile)=>{
        try {
            await createInfoProfileRequest(infoprofile);
            getInfoProfiles();
           // console.log(infoprofile);
        } catch (error) {
            console.log(error);
        } 
    }//Fin de createInfoProfile

    const deleteInfoProfile = async (id) => {
        try {
            const res = await deleteInfoProfileRequest(id);
           // console.log(res.status); 
            if (res.status == 200) setInfoProfiles(infoprofiles.filter(infoprofile => infoprofile._id != id))
            console.log(res);   
        } catch (error) {
          console.log(error);  
        }
    }

    const getInfoProfile = async (id) =>{
        try {
            const res = await getInfoProfileRequest(id);
            //console.log(res); 
            return res.data;
        } catch (error) {
            console.log(error); 
        }
    }

    const updateInfoProfile = async (id, infoprofile) => {
        try {
            const res = await updateInfoProfileRequest(id,infoprofile);
            console.log(res);   
            getInfoProfiles();
        } catch (error) {
          console.log(error);  
        }
    }

    return(
        <InfoProfileContext.Provider 
        value={{
            infoprofiles,
            createInfoProfile,
            getInfoProfiles,
            deleteInfoProfile,
            getInfoProfile,
            updateInfoProfile,
            }}> 

            {children}
        </InfoProfileContext.Provider>
    );
}