import { useEffect } from 'react';
import {useComments} from '../context/CommentsContext';
import CommentCard from '../components/CommentCard';

function CommentsPage() {
    const {getComments, comments} = useComments();

    useEffect(() =>{ 
        getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if(comments.length == 0 ) return (<h1>There are no registered comments in the list</h1>);

    return (
        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-2'> 
            {comments.map((comment) => (
                <CommentCard comment={comment} key={comment._id}/>
            ))}
        </div>
    );

}

export default CommentsPage