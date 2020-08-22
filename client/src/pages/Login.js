import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers';
import { Label, Input, Button, HelperText } from '@windmill/react-ui';
import * as yup from 'yup';

import ImageLight from '../assets/img/login-office.jpeg';
import ImageDark from '../assets/img/login-office-dark.jpeg';
import { signInStart } from '../store/user/user.action';
import { selectUserSigningIn } from '../store/user/user.selector';

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Please provide your email')
    .email('Please provide invalid email'),
  password: yup.string().required('Please provide your password').min(6),
});

const Login = () => {
  const dispatch = useDispatch();
  const isSigningIn = useSelector((state) => selectUserSigningIn(state));
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit = (data, e) => {
    console.log(data);
    dispatch(signInStart(data));
    e.target.reset();
  };

  return (
    <div className='flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900'>
      <div className='flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800'>
        <div className='flex flex-col overflow-y-auto md:flex-row'>
          <div className='h-32 md:h-auto md:w-1/2'>
            <img
              aria-hidden='true'
              className='object-cover w-full h-full dark:hidden'
              src={ImageLight}
              alt='Office'
            />
            <img
              aria-hidden='true'
              className='hidden object-cover w-full h-full dark:block'
              src={ImageDark}
              alt='Office'
            />
          </div>
          <main className='flex items-center justify-center p-6 sm:p-12 md:w-1/2'>
            <div className='w-full'>
              <h1 className='mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200'>
                Login
              </h1>
              <form autoComplete='off' onSubmit={handleSubmit(onSubmit)}>
                <Label>
                  <span>Email</span>
                  <Input
                    name='email'
                    className='mt-1'
                    type='email'
                    placeholder='admin@ezride.com'
                    ref={register}
                  />
                  <HelperText valid={false}>
                    {errors?.email?.message}
                  </HelperText>
                </Label>

                <Label className='mt-4'>
                  <span>Password</span>
                  <Input
                    name='password'
                    className='mt-1'
                    type='password'
                    placeholder='***************'
                    ref={register}
                  />
                  <HelperText valid={false}>
                    {errors?.password?.message}
                  </HelperText>
                </Label>

                <Button
                  type='submit'
                  className='mt-4'
                  block
                  disabled={isSigningIn}
                >
                  {isSigningIn ? 'Loading ...' : 'Log in'}
                </Button>
              </form>

              <hr className='my-8' />
              <p className='mt-4'>
                <Link
                  className='text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline'
                  to='/forgot-password'
                >
                  Forgot your password?
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Login;
