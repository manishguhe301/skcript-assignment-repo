'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import Board from './Board';
import { AppSdk } from '@/utils/sdk/AppSDK';
import { Post } from '@prisma/client';

const options = [
  { label: 'Show all', disabled: false, value: 'show-all' },
  { label: 'Public Boards', disabled: true, value: '' },
  { label: 'Bugs & Fixes', disabled: false, value: 'BUGS_FIXES' },
  { label: 'Feature Requests', disabled: false, value: 'FEATURES_REQUESTS' },
  { label: 'Integrations', disabled: false, value: 'INTEGRATIONS' },
];

const Roadmaps = () => {
  const [selected, setSelected] = useState('show-all');
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const boardParam = selected !== 'show-all' ? `?board=${selected}` : '';
        const res = await AppSdk.getData(`/api/post${boardParam}`, null);
        setPosts(res);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [selected]);

  return (
    <div className='max-w-[66rem] mx-auto pt-2 flex flex-col gap-5 px-4'>
      <div className=' flex items-center justify-between max-sm:flex-col max-sm:items-start max-sm:gap-2'>
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
      <Board posts={posts} loading={loading} />
    </div>
  );
};

export default Roadmaps;
