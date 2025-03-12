'use client';
import { Post } from '@prisma/client';
import React from 'react';
import Loader from './elements/Loader';
import { PostCard } from './PostCard';
import Image from 'next/image';

const Board = ({ posts, loading }: { posts: Post[]; loading: boolean }) => {
  const todoPosts = posts.filter((post) => post.status === 'TODO');
  const inProgressPosts = posts.filter((post) => post.status === 'IN_PROGRESS');
  const completedPosts = posts.filter((post) => post.status === 'COMPLETED');
  return (
    <div className='h-[calc(100vh-175px)] pb-4 '>
      <div className='grid grid-cols-3 gap-3  overflow-y-hidden h-full'>
        <div className='rounded-md bg-[#F8F8F8] border border-[#ECECEC] px-3 py-2'>
          <div
            className={`text-xs border-b py-1 font-semibold border-[#E8E8E8] flex items-center gap-1 text-[#EC4899]`}
          >
            <MaskedDiv bg='#EC4899' url='/icons/todo.svg' />
            Planned
          </div>
          <div className='py-3 h-[calc(100%-24px)] overflow-y-auto'>
            {loading ? (
              <div className='py-4 flex items-center justify-center'>
                <Loader />
              </div>
            ) : (
              <div
                className='flex flex-col w-full h-full overflow-y-auto max-h-[calc(100vh-250px)]
              no-scrollbar gap-3
              '
              >
                {todoPosts.length > 0 ? (
                  todoPosts.map((post: Post) => {
                    return <PostCard post={post} key={post.id} />;
                  })
                ) : (
                  <div className='flex flex-col items-center justify-center gap-2 py-4 text-[#777777]'>
                    <Image
                      src='/icons/noposts.svg'
                      alt=''
                      width={60}
                      height={60}
                      className='opacity-50'
                    />
                    No posts found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className='rounded-md bg-[#F8F8F8] border border-[#ECECEC] px-3 py-2'>
          <div
            className={`text-xs border-b py-1 font-semibold border-[#E8E8E8] flex items-center gap-1 text-[#FFAA00]`}
          >
            <MaskedDiv bg='#FFAA00' url='/icons/cook.svg' />
            In Progress
          </div>
          <div className='py-3'>
            {loading ? (
              <div className='py-4 flex items-center justify-center'>
                <Loader />
              </div>
            ) : (
              <div
                className='flex flex-col w-full h-full overflow-y-auto max-h-[calc(100vh-250px)]
              no-scrollbar gap-3
              '
              >
                {inProgressPosts.length > 0 ? (
                  inProgressPosts.map((post: Post) => {
                    return <PostCard post={post} key={post.id} />;
                  })
                ) : (
                  <div className='flex flex-col items-center justify-center gap-2 py-4 text-[#777777]'>
                    <Image
                      src='/icons/noposts.svg'
                      alt=''
                      width={60}
                      height={60}
                      className='opacity-50'
                    />
                    No posts found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className='rounded-md bg-[#F8F8F8] border border-[#ECECEC] px-3 py-2'>
          <div
            className={`text-xs border-b py-1 font-semibold border-[#E8E8E8] flex items-center gap-1 text-[#059669]`}
          >
            <MaskedDiv bg='#059669' url='/icons/flag.svg' />
            Completed{' '}
          </div>
          <div className='py-3'>
            {loading ? (
              <div className='py-4 flex items-center justify-center'>
                <Loader />
              </div>
            ) : (
              <div
                className='flex flex-col w-full h-full overflow-y-auto max-h-[calc(100vh-250px)]
              no-scrollbar gap-3
              '
              >
                {completedPosts.length > 0 ? (
                  completedPosts.map((post: Post) => {
                    return <PostCard post={post} key={post.id} />;
                  })
                ) : (
                  <div className='flex flex-col items-center justify-center gap-2 py-4 text-[#777777]'>
                    <Image
                      src='/icons/noposts.svg'
                      alt=''
                      width={60}
                      height={60}
                      className='opacity-50'
                    />
                    No posts found
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Board;

const MaskedDiv = ({ bg, url }: { bg: string; url: string }) => {
  return (
    <div
      className={`bg-[${bg}]`}
      style={{
        WebkitMaskImage: `url(${url})`,
        maskImage: `url(${url})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        height: '14px',
        width: '14px',
      }}
    />
  );
};
