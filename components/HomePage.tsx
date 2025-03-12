import React from 'react';
import Header from './Header';
import Roadmaps from './Roadmaps';

const HomePage = () => {
  return (
    <div className='bg-[#fff] w-full h-[100vh]'>
      <Header />
      <Roadmaps />
    </div>
  );
};

export default HomePage;
