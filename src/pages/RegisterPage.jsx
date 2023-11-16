import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { IoPersonAdd, IoLogIn } from 'react-icons/io5';
import ReCaptcha from 'react-google-recaptcha';

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const [captchaValue, setCaptchaValue] = useState(null);
  const navigate = useNavigate();

  console.log(registerErrors);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (isAuthenticated) navigate('/posts');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    console.log(values);
    signup(values);
  });

  //6LcLM3koAAAAADwHal-rtnwfNeBT_PFPtndNHFat Usa esta clave secreta para la comunicación entre tu sitio web y el servicio reCAPTCH
  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-white max-w-md p-10 rounded-md'>
        {registerErrors.map((error, i) => (
          <div
            className='bg-red-500 p-2
          my-2 text-white'
            key={i}
          >
            {error}
          </div>
        ))}

        <form onSubmit={onSubmit}>
          <h1 className='text-3xl font-bold my-2'>Register</h1>

          <label htmlFor='username'>Username</label>
          <input
            type='text'
            className='w-full bg-white text-black px-4 py-2 rounded-md my-2'
            placeholder='Username'
            {...register('username', {
              required: true,
              minLength: 5,
              maxLength: 30,
            })}
          />
          {errors.username?.type === 'required' && (
            <p className='text-red-500'>Username is required</p>
          )}
          {errors.username?.type === 'minLength' && (
            <p className='text-red-500'> The minimum length is 6 characters</p>
          )}

          <label htmlFor='email'>Email</label>
          <input
            type='email'
            className='w-full bg-white text-black px-4 py-2 rounded-md my-2'
            placeholder='email'
            {...register('email', {
              required: true,
              minLength: 5,
              maxLength: 30,
            })}
          />
          {errors.email && <p className='text-red-500'>Email is required</p>}

          <label htmlFor='password'>Password</label>
          <input
            type='password'
            className='w-full bg-white text-black px-4 py-2 rounded-md my-2'
            placeholder='password'
            {...register('password', {
              required: true,
              minLength: 6,
              maxLength: 30,
            })}
          />
          {errors.password?.type === 'required' && (
            <p className='text-red-500'>Password is required </p>
          )}
          {errors.password?.type === 'minLength' && (
            <p className='text-red-500'>The minimum length is 6 characters</p>
          )}

          <button
            type='submit'
            className='bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
            disabled={!captchaValue}
          >
            <IoPersonAdd size={30} />
          </button>

          <ReCaptcha
            sitekey='6LcLM3koAAAAACqcPHAA695EyuBYPbGychXXmWay'
            onChange={(value) => setCaptchaValue(value)}
          />
        </form>

        <div className='flex mx-2 px-2 items-start'>
          <p className='flex gap-x-2 justify-between pt-5 mt-5'>
            ¿Do you already have an account?
            <Link
              to='/login'
              className='text-sky-500 flex mx-2 px-2 items-start'
            >
              !Login¡
              <IoLogIn size={30} className='mx-1' />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
