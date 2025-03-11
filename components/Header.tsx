import Image from 'next/image';
import React from 'react';

const Header = () => {
  return (
    <div className=' border-b border-[#EDEDED]'>
      <div className='max-w-[80rem] mx-auto px-4 py-2'>
        <div className='flex items-center justify-between'>
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
            <button className='px-[10px] py-[5px] flex items-center justify-center border border-[hsla(0,0%,6%,0.15)] text-[#181818] rounded-md text-xs cursor-pointer font-semibold '>
              Sign in
            </button>
            <button className='px-[10px] py-[5px] flex items-center justify-center border border-[#4A5CFF] bg-[#4A5CFF] text-[#fff] rounded-md text-xs cursor-pointer font-semibold '>
              Sign up
            </button>
          </div>
        </div>
        <div className='flex items-center gap-1 pt-5'>
          <div className='flex items-center justify-center px-[6px] py-0 gap-1 hover:text-[#4A5CFF] transition-all duration-75 cursor-pointer uppercase text-[10px] !font-bold text-[#181818] opacity-70 hover:opacity-100 '>
            <Image src='/icons/board.svg' alt='icon' width={16} height={16} />
            Boards
            <Image src='/icons/down.svg' alt='icon' width={16} height={16} />
          </div>
          <div className='flex items-center justify-center px-[6px] py-0 gap-1 hover:text-[#4A5CFF] transition-all duration-75 cursor-pointer uppercase text-[10px] !font-bold text-[#4A5CFF]  '>
            <Image src='/icons/tele.svg' alt='icon' width={16} height={16} />
            Roadmap
          </div>
          <div className='flex items-center justify-center px-[6px] py-0 gap-1 hover:text-[#4A5CFF] transition-all duration-75 cursor-pointer uppercase text-[10px] !font-bold text-[#181818] opacity-70 hover:opacity-100 '>
            <Image src='/icons/rocket.svg' alt='icon' width={16} height={16} />
            ChangeLog
          </div>
          <div className='flex items-center justify-center px-[6px] py-0 gap-1 hover:text-[#4A5CFF] transition-all duration-75 cursor-pointer uppercase text-[10px] !font-bold text-[#181818] opacity-70 hover:opacity-100 '>
            <Image src='/icons/base.svg' alt='icon' width={16} height={16} />
            Knowledge base
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
