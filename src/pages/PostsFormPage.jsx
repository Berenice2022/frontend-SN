import { useForm } from 'react-hook-form';
import { usePosts } from '../context/PostsContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
//import {IoBagAdd} from 'react-icons/io5';

function PostsFormPage() {
  const {
    //register,
    //handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { createPost, getPost, updatePost } = usePosts();
  const navigate = useNavigate();
  const params = useParams();
  const el = useRef(); // accesing input element

  const [file, setFile] = useState();
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState('');

  useEffect(() => {
    async function loadtPost() {
      if (params.id) {
        const post = await getPost(params.id);
        console.log(post);
        setValue('description', post.description);
        setValue('image', post.image);
        ///setValue('creationdate',post.creationdate);
        //setValue('date',dayjs(product.date).utc().format('YYYY/MM/DD'));
        setDescription(post.description);
        setPicture(post.image);
      }
    }
    loadtPost();
    //console.log(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = () => {
    const dc = new FormData();
    dc.append('description', description);
    dc.append('file', file);
    if (params.id) {
      updatePost(params.id, dc);
    } else {
      createPost(dc);
    }
    navigate('/posts');
  };

  /*const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updatePost(params.id, data);
    } else {
      createPost(data);
    }
    navigate('/posts');
  });*/

  return (
    <div className='flex items-center justify-center '>
      <div className='bg-white max-w-md w-full p-10 border rounded-md'>
        <form
          onSubmit={onSubmit}
          headers={{ 'Content-Type': 'multipart/form-data' }}
          encType='multipart/form-data'
        >
          <h1 className='text-base font-semibold leading-7 text-gray-900'>
            Post
          </h1>

          <div className='mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-6'>
              <label className='block text-sm font-medium leading-6 text-gray-900'>
                Description
              </label>
              <div className='mt-1'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    type='text'
                    id='description'
                    name='description'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    //{...register('description', { required: true })}
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
                Image
              </label>
              <div className='mt-1'>
                <img src={`http://localhost:4000${picture}`}></img>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    type='file'
                    id='image'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    name='file'
                    placeholder='Image'
                    onChange={handleChange}
                    ref={el}
                    required
                    accept='file/png, .jpeg, .jpg, file/gif'
                    // {...register('image', { required: true })}
                  />
                </div>
                {errors.image && (
                  <div className='text-red-500'>The image is required</div>
                )}
              </div>
            </div>
          </div>

          <div className='mt-6 flex items-center justify-end gap-x-6'>
            <Link
              to={'/posts'}
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

export default PostsFormPage;
