import { useForm } from 'react-hook-form';
import { useInterests } from '../context/InterestsContext';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useEffect /*, useState */ } from 'react';
//import {IoBagAdd} from 'react-icons/io5';

function InterestsFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { createInterest, getInterest, updateInterest } = useInterests();
  const navigate = useNavigate();
  const params = useParams();

  //const [file, setFile] = useState();
  //const handleChange = e =>{console.log(e.target.files[0]);setFile(e.target.files[0])}

  useEffect(() => {
    async function loadtInterest() {
      if (params.id) {
        const interest = await getInterest(params.id);
        console.log(interest);
        setValue('interest_category', interest.interest_category);
        setValue('name', interest.name);
        setValue('description', interest.description);
        setValue('importance', interest.importance);
        ///setValue('creationdate',post.creationdate);
        //setValue('date',dayjs(product.date).utc().format('YYYY/MM/DD'));
      }
    }
    loadtInterest();
    //console.log(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateInterest(params.id, data);
    } else {
      createInterest(data);
    }
    navigate('/interests');
  });

  return (
    <div className='flex items-center justify-center '>
      <div className='bg-white max-w-md w-full p-10 border rounded-md'>
        <form
          onSubmit={onSubmit}
          headers={{ 'Content-Type': 'multipart/form-data' }}
          encType='multipart/form-data'
        >
          <h1 className='text-base font-semibold leading-7 text-gray-900'>
            Interests
          </h1>

          <div className='mt-3 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
            <div className='sm:col-span-6'>
              <label className='block text-sm font-medium leading-6 text-gray-900'>
                Category
              </label>
              <div className='mt-1'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    type='text'
                    id='interest_category'
                    name='interest_category'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    placeholder='Category'
                    {...register('interest_category', { required: true })}
                  />
                </div>
                {errors.interest_category && (
                  <div className='text-red-500'>The category is required</div>
                )}
              </div>
            </div>
            <div className='sm:col-span-6'>
              <label className='block text-sm font-medium leading-6 text-gray-900'>
                Name
              </label>
              <div className='mt-1'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    type='text'
                    id='name'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    name='name'
                    placeholder='Name'
                    {...register('name', { required: true })}
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
                    {...register('description', { required: true })}
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
                Importance
              </label>
              <div className='mt-1'>
                <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md'>
                  <input
                    type='text'
                    id='importance'
                    className='block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'
                    name='importance'
                    placeholder='importancia'
                    {...register('importance', { required: true })}
                  />
                </div>
                {errors.importance && (
                  <div className='text-red-500'>The importance is required</div>
                )}
              </div>
            </div>
          </div>

          <div className='mt-6 flex items-center justify-end gap-x-6'>
            <Link
              to={'/interests/'}
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

export default InterestsFormPage;
