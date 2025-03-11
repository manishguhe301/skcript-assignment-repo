import Image from 'next/image';
import React from 'react';

const Header = () => {
  return (
    <div className='max-w-[80rem] mx-auto px-4 py-2 flex items-center justify-between'>
      <div className='flex items-center gap-2'>
        <Image
          src='/logo.webp'
          alt='logo'
          width={100}
          height={100}
          className='h-8 w-8 rounded-full'
        />
        <p className='text-[0.9375rem] font-semibold text-[#181818] opacity-100'>
          FeatureOS
        </p>
      </div>
      <div className=' flex items-center gap-2'>
        <button className='px-[10px] py-[5px] flex items-center justify-center border border-[hsla(0,0%,6%,0.15)] text-[#181818] rounded-md text-xs cursor-pointer font-medium '>
          Sign in
        </button>
        <button className='px-[10px] py-[5px] flex items-center justify-center border border-[#4A5CFF] bg-[#4A5CFF] text-[#fff] rounded-md text-xs cursor-pointer font-medium '>
          Sign up
        </button>
      </div>
    </div>
  );
};

export default Header;
