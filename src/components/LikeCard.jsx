import { useLikes } from '../context/LikesContext';
import { IoTrashBinSharp } from 'react-icons/io5';

/* eslint-disable react/prop-types */
function LikeCard({ like }) {
  const { deleteLike } = useLikes();
  return (
    <div className='bg-white max-w-md w-full p-10 rounded-md'>
      <header className='flex justify-between'>
        <h1 className='text-2xl font-bold'>Likes list</h1>
        <div className='flex gap-x-2 items-center'>
          <button
            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg'
            onClick={() => {
              deleteLike(like._id);
            }}
          >
            <IoTrashBinSharp />
          </button>
        </div>
      </header>
      <p className='text-slate-300'>{like.post_id}</p>
    </div>
  );
}

export default LikeCard;
