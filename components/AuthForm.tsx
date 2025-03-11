'use client';
import React, { useState } from 'react';
import { Spinner } from './Spinner';

const AuthForm = ({
  dialogType,
  setDialogType,
  setLoading,
  loading,
}: {
  dialogType: 'signIn' | 'signUp' | null;
  setDialogType: React.Dispatch<
    React.SetStateAction<'signIn' | 'signUp' | null>
  >;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [data, setData] = useState({
    email: '',
    password: '',
    name: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setDialogType(null);
      setLoading(false);
    }, 20000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full flex flex-col items-start gap-3'
    >
      {dialogType === 'signUp' && (
        <div className='flex flex-col gap-1 w-full'>
          <label
            htmlFor='name'
            className='text-xs font-semibold text-[#181818] opacity-80'
          >
            Name
          </label>
          <input
            type='text'
            name='name'
            id='name'
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className='w-full px-3 py-[10px] border border-[hsla(0,0%,6%,0.15)] rounded-md text-[#181818] text-xs outline-none focus:border-[#4A5CFF] transition-all '
            disabled={loading}
          />
        </div>
      )}
      <div className='flex flex-col gap-1 w-full'>
        <label
          htmlFor='email'
          className='text-xs font-semibold text-[#181818] opacity-80'
        >
          Email
        </label>
        <input
          type='email'
          name='email'
          id='email'
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
          className='w-full px-3 py-[10px] border border-[hsla(0,0%,6%,0.15)] rounded-md text-[#181818] text-xs outline-none focus:border-[#4A5CFF] transition-all'
          disabled={loading}
        />
      </div>
      <div className='flex flex-col gap-1 w-full relative'>
        <label
          htmlFor='password'
          className='text-xs font-semibold text-[#181818] opacity-80'
        >
          Password
        </label>
        <div className='relative w-full'>
          <input
            type={showPassword ? 'text' : 'password'}
            name='password'
            id='password'
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className='w-full px-3 py-[10px] pr-10 border border-[hsla(0,0%,6%,0.15)] rounded-md text-[#181818] text-xs outline-none focus:border-[#4A5CFF] transition-all'
            disabled={loading}
          />
          <span
            className='absolute right-3 top-1/2 transform -translate-y-1/2 text-[#181818] opacity-70 !text-base cursor-pointer material-symbols-outlined'
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'visibility_off' : 'visibility'}
          </span>
        </div>
      </div>
      <button
        className={`w-full mt-2 py-[10px] flex items-center justify-center border rounded-md text-xs font-semibold cursor-pointer transition-all ${
          dialogType === 'signIn'
            ? 'border-[hsla(0,0%,6%,0.15)] text-[#181818] hover:bg-[hsla(0,0%,6%,0.05)]'
            : 'border-[#4A5CFF] bg-[#4A5CFF] text-[#fff] hover:bg-[#3B4AD9]'
        } ${
          loading ||
          !data.email ||
          !data.password ||
          (dialogType === 'signUp' && !data.name)
            ? 'opacity-50 cursor-not-allowed pointer-events-none'
            : ''
        } `}
        disabled={
          loading ||
          !data.email ||
          !data.password ||
          (dialogType === 'signUp' && !data.name)
        }
      >
        {loading ? (
          <Spinner className='h-5 w-5 fill-[#4A5CFF]' />
        ) : dialogType === 'signIn' ? (
          'Sign In'
        ) : (
          'Sign Up'
        )}
      </button>

      <p
        className='text-xs text-[#181818] opacity-80 cursor-pointer hover:text-[#4A5CFF] transition-all hover:underline'
        onClick={() => {
          setDialogType(dialogType === 'signIn' ? 'signUp' : 'signIn');
          setLoading(false);
          setData({
            email: '',
            password: '',
            name: '',
          });
        }}
      >
        {dialogType === 'signIn'
          ? "Don't have an account? "
          : 'Already have an account? '}
      </p>
    </form>
  );
};

export default AuthForm;
