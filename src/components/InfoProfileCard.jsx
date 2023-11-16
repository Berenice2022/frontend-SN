import { useInfoProfiles } from '../context/InfoProfilesContext';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

import { IoTrashBinSharp, IoPencilSharp } from 'react-icons/io5';

/* eslint-disable react/prop-types */
function InfoProfileCard({ infoprofile }) {
  /* console.log(infoprofile);*/

  const { deleteInfoProfile } = useInfoProfiles();
  return (
    <div className='bg-white max-w-md w-full p-10 rounded-md'>
      <header className='flex justify-between'>
        <h1 className='text-2xl font-bold'>{infoprofile.fullname}</h1>
        <div className='flex gap-x-2 items-center'>
          <button
            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg'
            onClick={() => {
              deleteInfoProfile(infoprofile._id);
            }}
          >
            <IoTrashBinSharp />
          </button>
          <Link
            className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg'
            to={`/infoprofiles/${infoprofile._id}`}
          >
            <IoPencilSharp />
          </Link>
        </div>
      </header>
      <p className='text-slate-300'>
        {dayjs(infoprofile.birthdate).utc().format('DD/MM/YYYY')}
      </p>
      <p className='text-slate-300'>{infoprofile.gender}</p>
      <p className='text-slate-300'>{infoprofile.civil_status}</p>
      <p className='text-slate-300'>{infoprofile.phone_number}</p>
      <p className='text-slate-300'>{infoprofile.job}</p>
      <p className='text-slate-300'>{infoprofile.description_personal}</p>
    </div>
  );
}

export default InfoProfileCard;
