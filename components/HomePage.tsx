import React from 'react';
import Header from './Header';
import Roadmaps from './Roadmaps';

const HomePage = () => {
  return (
    <div className='bg-[#fff] w-full h-[100vh]'>
      <Header />
      <Roadmaps />
      <div className='w-full flex items-center justify-center px-2 py-2 text-sm text-[#181818 ]'>
        Made with ❤️ by{' '}
        <span className='text-[#181818] font-bold pl-1'> Manish </span>
      </div>
    </div>
  );
};

export default HomePage;
