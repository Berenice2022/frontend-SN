import {createContext, useContext, useState} from 'react';
import {createLikeRequest, 
    getLikesRequest,
getLikeRequest, deleteLikeRequest} from '../api/likes';


const LikeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useLikes = () => {
    const context = useContext(LikeContext);
    if(!context){
        throw new Error("usePosts must be used within a Like Provider");
    }
    return context;
}

// eslint-disable-next-line react/prop-types
export function LikeProvider({ children }) {
    const [likes, setLikes] = useState([]);

    const getLikes = async () => {
        try{
            const res = await getLikesRequest();
            setLikes(res.data);
        }catch (error){
            console.error(error);
        }
    };

    const createLike = async (like)=>{
        try {
            await createLikeRequest(like);
        } catch (error) {
            console.log(error);
        } 
    }

    const deleteLike = async (id) => {
        try {
            const res = await deleteLikeRequest(id);
            if (res.status == 200) setLikes(likes.filter(like => like._id != id))
            console.log(res);   
        } catch (error) {
          console.log(error);  
        }
    }

    const getLike = async (id) =>{
        try {
            const res = await getLikeRequest(id);
            console.log(res); 
            return res.data;
        } catch (error) {
            console.log(error); 
        }
    }

    return(
        <LikeContext.Provider 
        value={{
            likes,
            createLike,
            getLikes,
            deleteLike,
            getLike,
            }}> 

            {children}
        </LikeContext.Provider>
    );
}