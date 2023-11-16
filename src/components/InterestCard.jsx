import { useInterests } from '../context/InterestsContext';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

import { IoTrashBinSharp, IoPencilSharp } from 'react-icons/io5';

/* eslint-disable react/prop-types */
function InterestCard({ interest }) {
  /* console.log(interest);*/

  const { deleteInterest } = useInterests();
  return (
    <div className='border-zinc-500 bg-white  border max-w-md w-full p-10 rounded-md first-letter '>
      <header className='flex justify-between'>
        <h1 className='text-2xl font-bold'>{interest.name}</h1>
        <div className='flex gap-x-2 items-center'>
          <button
            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg'
            onClick={() => {
              deleteInterest(interest._id);
            }}
          >
            <IoTrashBinSharp />
          </button>
          <Link
            className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg'
            to={`/interests/${interest._id}`}
          >
            <IoPencilSharp />
          </Link>
        </div>
      </header>
      <p className='text-slate-300'>{interest.interest_category}</p>
      <p className='text-slate-300'>{interest.description}</p>
      <p className='text-slate-300'>{interest.importance}</p>
    </div>
  );
}

export default InterestCard;
