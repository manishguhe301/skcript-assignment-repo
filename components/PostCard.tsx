'use client';
import { Post } from '@prisma/client';
import { Dialog } from '@radix-ui/react-dialog';
import Image from 'next/image';
import { DialogContent, DialogTitle } from './ui/dialog';
import { useState } from 'react';

export const PostCard = ({ post }: { post: Post }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        className={`p-[10px] rounded-[0.375rem] bg-[#fff]  border border-[#E2E2E2]  transition-all duration-100  flex items-center gap-2 cursor-pointer hover:bg-gray-50 hover:border-[#E8E8E8]`}
        onClick={() => setOpen(true)}
        key={post.id}
      >
        <div className='flex flex-col items-center justify-center gap-0.5 rounded-lg border border-[#DBDBDB] px-2 py-1.5  space-x-0 text-xs leading-3 h-[40px] w-[35px]'>
          <Image src='/icons/up.svg' alt='' width={12} height={12} />
          {post.upvoters}
        </div>
        <div className='flex flex-col h-full w-full gap-1'>
          <div className='line-clamp-2 font-medium text-[13px]'>
            {post.title}
          </div>
          <div className='flex items-center  px-1 border border-[#DBDBDB] py-0.5 font-medium text-[10px] w-fit rounded-sm'>
            {post.board === 'BUGS_FIXES'
              ? 'Bugs & Fixes'
              : post.board === 'FEATURES_REQUESTS'
              ? 'Features Requests'
              : 'Integrations'}
          </div>
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='w-[40rem] p-4 space-y-3'>
          <DialogTitle className='text-lg font-bold text-[#181818] opacity-80'>
            {post.title}
          </DialogTitle>
          <p className='text-sm text-gray-700'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis
            itaque neque pariatur adipisci, perferendis nihil quaerat doloribus
            cupiditate quae molestiae assumenda aspernatur? Id unde omnis
            laudantium quo, corrupti explicabo maiores impedit odit porro
            molestiae accusamus ea autem. Ipsum, adipisci ipsam aut ut provident
            ullam dolores sit placeat similique incidunt iste quisquam quo quam
            quasi porro, dicta sint eveniet, optio rem omnis inventore nesciunt
            reprehenderit praesentium! Nulla beatae cumque esse debitis, rem
            quis quisquam ducimus, corrupti dolorum doloribus voluptatem sequi
            illo voluptatibus nihil ex, sunt deleniti ut architecto recusandae.
            Nulla blanditiis delectus porro in. Officiis enim iste id odio
            laudantium quod.
          </p>
          <div className='flex items-center gap-2 text-xs text-gray-500'>
            <span>Upvotes: {post.upvoters}</span>
            <span className='capitalize'>
              Category: {post.board.replace('_', ' ').toLowerCase()}
            </span>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
