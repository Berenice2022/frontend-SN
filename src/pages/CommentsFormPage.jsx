import { useForm } from 'react-hook-form';
import { useComments } from '../context/CommentsContext';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function CommentsFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { createComment, getComment, updateComment } = useComments();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadtComment() {
      if (params.id) {
        const comment = await getComment(params.id);
        console.log(comment);
        setValue('comment', comment.comment);
        //console.log(dayjs(infoprofile.birthdate).utc().format('YYYY-MM-DD'))
      }
    }
    loadtComment();
    //console.log(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      //updateInfoProfile(params.id, data);
      updateComment(params.id, data);
    } else {
      //createInfoProfile(data);
      createComment(data);
    }
    // navigate('/comments');
    navigate('/posts');
  });

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-white max-w-md w-full p-10 rounded-md '>
        <form onSubmit={onSubmit}>
          <h1 className='text-3xl font-bold my-2'>Comentario</h1>
          <div className='mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-6'>
              <label className='block text-sm font-medium leading-6 text-gray-900'>
                Comentario
              </label>
              <div className='mt-1'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    type='text'
                    id='comment'
                    name='comment'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder='Comentario'
                    {...register('comment', { required: true })}
                  />
                </div>
                {errors.comment && (
                  <div className='text-red-500'>The comment is required</div>
                )}
              </div>
            </div>
          </div>

          <div className='mt-6 flex items-center justify-end gap-x-6'>
            <Link
              to={'/posts/'}
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

export default CommentsFormPage;
