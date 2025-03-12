'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const options = [
  { label: 'Show all', disabled: false, value: 'show-all' },
  { label: 'Public Boards', disabled: true, value: '' },
  { label: 'Bugs & Fixes', disabled: false, value: 'bugs-fixes' },
  { label: 'Feature Requests', disabled: false, value: 'feature-requests' },
  { label: 'Integrations', disabled: false, value: 'integrations' },
];

const Roadmaps = () => {
  const [selected, setSelected] = useState('show-all');

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <div className='max-w-[62rem] mx-auto pt-2 flex items-center justify-between'>
      <div className='flex flex-col gap-2'>
        <h3 className='text-lg font-semibold'>Roadmaps</h3>
        <p className='text-[13px] text-[#181818]'>
          Stay connected with our development journey and get a sneak peek at
          upcoming features! 😉
        </p>
      </div>
      <div className='flex items-center gap-2'>
        <div className='px-3 py-2 rounded-full hover:bg-gray-100 transition-all duration-100 border-[0.5px] outline-primary'>
          <Image src='/icons/tag.svg' alt='' width={13} height={13} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='px-[10px] py-[4px] rounded-full hover:bg-gray-100 border-[0.5px] outline-primary font-medium text-xs flex items-center gap-2 cursor-pointer text-[#181818] hover:border-[#4A5CFF] transition-all duration-100'>
              {options.find((option) => option.value === selected)?.label}
              <Image src='/icons/down.svg' alt='' width={13} height={13} />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-[10rem] '>
            {options.map((option) => (
              <DropdownMenuItem
                key={option.value}
                className={`cursor-pointer text-[13px] ${
                  option.disabled
                    ? '!text-gray-400 cursor-not-allowed text-[13px]'
                    : ''
                } ${
                  selected === option.value
                    ? 'text-[#4A5CFF] bg-gray-100 font-medium'
                    : ''
                }`}
                onClick={() => !option.disabled && setSelected(option.value)}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Roadmaps;
