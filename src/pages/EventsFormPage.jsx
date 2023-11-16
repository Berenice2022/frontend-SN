import { useForm } from 'react-hook-form';
import { useEvents } from '../context/EventsContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
//import {IoBagAdd} from 'react-icons/io5';

function EventsFormPage() {
  const {
    //register,
    // handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { createEvent, getEvent, updateEvent } = useEvents();
  const navigate = useNavigate();
  const params = useParams();

  const [file, setFile] = useState();
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState('');
  useEffect(() => {
    async function loadtEvent() {
      if (params.id) {
        const event = await getEvent(params.id);
        console.log(event);
        setValue('name', event.name);
        setValue('description', event.description);
        setValue('address', event.address);
        setValue('photography', event.photography);

        setName(event.name);
        setAddress(event.address);
        setDescription(event.description);
        setPicture(event.photography);
      }
    }
    loadtEvent();
    //console.log(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    // console.log(e.target.files[0]);
  };

  const el = useRef(); // accesing input element
  const onSubmit = () => {
    //e.preventDefault();
    const dc = new FormData();
    // console.log(file);
    dc.append('name', name);
    dc.append('description', description);
    dc.append('address', address);
    dc.append('file', file);
    if (params.id) {
      console.log(file);
      updateEvent(params.id, dc);
    } else {
      createEvent(dc);
    }
    navigate('/events');
  };

  /*const handleSubmitfle = () => {
    //e.preventDefault();
    console.log(file);
    console.log(name);
    console.log(address);
    console.log(description);
    const data = new FormData();
    data.append('name', name);
    data.append('description', description);
    data.append('address', address);
    data.append('file', file);

    console.log(data);
    createEvent(data);
    navigate('/events');
  };*/

  /*const uploadFile = () => {
    const formData = new FormData();
    formData.append('file', file); // appending file
    console.log(formData);
  }*/
  return (
    <div className='flex items-center justify-center '>
      <div className='bg-white max-w-md w-full p-10 border rounded-md'>
        <form
          onSubmit={onSubmit}
          headers={{ 'Content-Type': 'multipart/form-data' }}
          encType='multipart/form-data'
        >
          <h1 className='text-base font-semibold leading-7 text-gray-900'>
            Event
          </h1>

          <div className='mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-6'>
              <label className='block text-sm font-medium leading-6 text-gray-900'>
                Name
              </label>
              <div className='mt-1'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder='Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    // {...register('name', { required: true })}
                    required
                  />
                </div>
                {errors.name && (
                  <div className='text-red-500'>The name is required</div>
                )}
              </div>
            </div>
            <div className='sm:col-span-6'>
              <label className='block text-sm font-medium leading-6 text-gray-900'>
                Description
              </label>
              <div className='mt-1'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    type='text'
                    id='description'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    name='description'
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    //{...register('description', { required: true })}
                    required
                  />
                </div>
                {errors.description && (
                  <div className='text-red-500'>
                    The description is required
                  </div>
                )}
              </div>
            </div>
            <div className='sm:col-span-6'>
              <label className='block text-sm font-medium leading-6 text-gray-900'>
                Address
              </label>
              <div className='mt-1'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    type='text'
                    id='address'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    name='address'
                    placeholder='Address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    // {...register('address', { required: true })}
                    required
                  />
                </div>
                {errors.address && (
                  <div className='text-red-500'>The address is required</div>
                )}
              </div>
            </div>
            <div className='sm:col-span-6'>
              <label className='block text-sm font-medium leading-6 text-gray-900'>
                Photography
              </label>
              <div className='mt-1'>
                <img src={`http://localhost:4000${picture}`}></img>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    type='file'
                    id='photography'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    name='file'
                    ref={el}
                    onChange={handleChange}
                    placeholder='photography'
                    required
                    accept='file/png, .jpeg, .jpg, file/gif'
                    //{...register('file', { required: true })}
                  />
                </div>
                {errors.file && (
                  <div className='text-red-500'>
                    The photography is required
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='mt-6 flex items-center justify-end gap-x-6'>
            <Link
              to={'/events/'}
              type='button'
              className='text-sm font-semibold leading-6 text-gray-900'
            >
              Cancel
            </Link>
            <button
              type='submit'
              className='rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EventsFormPage;
