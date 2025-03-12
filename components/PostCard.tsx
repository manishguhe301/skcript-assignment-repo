'use client';
import { useUser } from '@/utils/hooks/useUser';
import { Post } from '@prisma/client';
import Image from 'next/image';

export const PostCard = ({ post }: { post: Post }) => {
  const { user } = useUser();
  return (
    <div
      className={`p-[10px] rounded-[0.375rem] bg-[#fff]  border border-[#E2E2E2]  transition-all duration-100  flex items-center gap-2 ${
        !user?.id
          ? 'cursor-not-allowed'
          : 'cursor-pointer hover:bg-gray-50 hover:border-[#E8E8E8]'
      }`}
      key={post.id}
    >
      <div className='flex flex-col items-center justify-center gap-0.5 rounded-lg border border-[#DBDBDB] px-2 py-1.5  space-x-0 text-xs leading-3 h-[40px] w-[35px]'>
        <Image src='/icons/up.svg' alt='' width={12} height={12} />
        {post.upvoters}
      </div>
      <div className='flex flex-col h-full w-full gap-1'>
        <div className='line-clamp-2 font-medium text-[13px]'>{post.title}</div>
        <div className='flex items-center  px-1 border border-[#DBDBDB] py-0.5 font-medium text-[10px] w-fit rounded-sm'>
          {post.board === 'BUGS_FIXES'
            ? 'Bugs & Fixes'
            : post.board === 'FEATURES_REQUESTS'
            ? 'Features Requests'
            : 'Integrations'}
        </div>
      </div>
    </div>
  );
};
