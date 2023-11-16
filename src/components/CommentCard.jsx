import { useComments } from '../context/CommentsContext';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

import { IoTrashBinSharp, IoPencilSharp } from 'react-icons/io5';

/* eslint-disable react/prop-types */
function CommentCard({ comment }) {
  /* console.log(infoprofile);*/

  const { deleteComment } = useComments();
  return (
    <div className='bg-white max-w-md w-full p-10 rounded-md'>
      <header className='flex justify-between'>
        <h1 className='text-2xl font-bold'>{comment.comment}</h1>
        <div className='flex gap-x-2 items-center'>
          <button
            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg'
            onClick={() => {
              deleteComment(comment._id);
            }}
          >
            <IoTrashBinSharp />
          </button>
          <Link
            className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg'
            to={`/comments/${comment._id}`}
          >
            <IoPencilSharp />
          </Link>
        </div>
      </header>
      <p className='text-slate-300'>{comment.post_id}</p>
      <p className='text-slate-300'>
        {dayjs(comment.creationdate).utc().format('DD/MM/YYYY')}
      </p>
    </div>
  );
}

export default CommentCard;
