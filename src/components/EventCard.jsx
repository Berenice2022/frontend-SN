import { useEvents } from '../context/EventsContext';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

import { IoTrashBinSharp, IoPencilSharp } from 'react-icons/io5';

/* eslint-disable react/prop-types */
function EventCard({ event }) {
  /* console.log(infoprofile);*/

  const { deleteEvent } = useEvents();
  return (
    <div className='border-zinc-500 bg-white  border max-w-md w-full p-10 rounded-md first-letter '>
      <header className='flex justify-between'>
        <h1 className='text-2xl font-bold'>{event.name}</h1>
        <div className='flex gap-x-2 items-center'>
          <button
            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg'
            onClick={() => {
              deleteEvent(event._id);
            }}
          >
            <IoTrashBinSharp />
          </button>
          <Link
            className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg'
            to={`/events/${event._id}`}
          >
            <IoPencilSharp />
          </Link>
        </div>
      </header>

      <p className=''>{event.description}</p>
      <p className=''>{event.address}</p>
      <img
        //className='h-50 w-50'
        src={`http://localhost:4000${event.photography}`}
      ></img>
    </div>
  );
}

export default EventCard;
