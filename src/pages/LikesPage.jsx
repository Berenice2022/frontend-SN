import { useEffect } from 'react';
import {useLikes} from '../context/LikesContext';
import LikeCard from '../components/LikeCard';


function LikesPage() {
    const {getLikes, likes} = useLikes();
    
    useEffect(() =>{ 
        getLikes();//getInfoProfiles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(likes.length == 0 ) return (<h1>There are no registered likes in the list</h1>);

    return (
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-2'> 
            {likes.map((like) => (
                <LikeCard like={like} key={like._id}/>
            ))}
        </div>
    );

}

export default LikesPage