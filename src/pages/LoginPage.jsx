import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  IoPersonAdd,
  IoLogIn,
  IoEyeSharp,
  IoEyeOffSharp,
} from 'react-icons/io5';
import ReCaptcha from 'react-google-recaptcha';

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signin, isAuthenticated, errors: signInErrors } = useAuth();
  const [passwordShown, setPasswordShown] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);

  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const navigate = useNavigate();

  /*useEffect(() => {
        if (isAuthenticated)
            navigate('/products');
        else
            console.log('No esta autenticado');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated])*/

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    if (isAuthenticated) navigate('/posts');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const onSubmit = handleSubmit((date) => {
    //console.log(date);
    signin(date);
  });

  return (
    <div className='flex items-center justify-center h-screen'>
      <div className='bg-white max-w-md w-full p-10 rounded-md'>
        <h1 className='text-3xl font-bold my-3'>Login</h1>
        {signInErrors.map((error, i) => (
          <div className='bg-red-500 p-2 my-2 text-white' key={i}>
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit}>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            className='w-full bg-white text-black px-4 py-2 rounded-md my-2'
            placeholder='Email'
            {...register('email', { required: true })}
          />
          {errors.email && <p className='text-red-500'>Email es requerido</p>}

          <label htmlFor='password'>Password</label>
          <div className='flex justify-end items-center relative'>
            <input
              type={passwordShown ? 'text' : 'password'}
              className='w-full bg-white text-black  px-4 py-2 rounded-md my-2'
              placeholder='Password'
              {...register('password', { required: true, minLength: 6 })}
            />

            {passwordShown ? (
              <IoEyeSharp
                size={30}
                className='absolute mr-2 w-10'
                onClick={togglePasswordVisibility}
              />
            ) : (
              <IoEyeOffSharp
                size={30}
                className='absolute mr-2 w-10'
                onClick={togglePasswordVisibility}
              />
            )}

            {errors.password?.type === 'required' && (
              <p className='text-red-500'>Password requerido</p>
            )}
            {errors.password?.type === 'minLength' && (
              <p className='text-red-500'>
                La longitud minima es de 6 caracteres
              </p>
            )}
          </div>

          <button
            type='submit'
            className='bg-zinc-700 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-md'
            disabled={!captchaValue}
          >
            <IoLogIn size={30} />
          </button>

          <ReCaptcha
            sitekey='6LcLM3koAAAAACqcPHAA695EyuBYPbGychXXmWay'
            onChange={(value) => setCaptchaValue(value)}
          />
        </form>
        <div className='flex mx-2 px-2 items-start'>
          <p className='flex gap-x-2 justify-between pt-5 mt-5'>
            ¿Do not have an account?
            <Link
              to='/register'
              className='text-sky-500 flex mx-2 px-2 items-start'
            >
              ¡Sign Up!
              <IoPersonAdd size={30} className='mx-1' />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
