'use client';
import { Post } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import Loader from './elements/Loader';
import { PostCard } from './PostCard';
import Image from 'next/image';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
} from '@dnd-kit/core';
import { useUser } from '@/utils/hooks/useUser';
import { AppSdk } from '@/utils/sdk/AppSDK';
import { toast } from 'sonner';

const Board = ({ posts, loading }: { posts: Post[]; loading: boolean }) => {
  const [items, setItems] = useState<Post[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { user } = useUser();

  useEffect(() => {
    setItems(posts);
  }, [posts]);

  const todoPosts = items.filter((post) => post.status === 'TODO');
  const inProgressPosts = items.filter((post) => post.status === 'IN_PROGRESS');
  const completedPosts = items.filter((post) => post.status === 'COMPLETED');

  const handleDragStart = (event: DragStartEvent) => {
    if (user) {
      const { active } = event;
      setActiveId(active.id as string);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    if (!user) return;

    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const activePost = items.find((item) => item.id === activeId);
    const overPost = items.find((item) => item.id === overId);

    if (!activePost || !overPost) return;

    if (activePost.status !== overPost.status) {
      setItems((prevItems) => {
        return prevItems.map((item) => {
          if (item.id === activeId) {
            return { ...item, status: overPost.status };
          }
          return item;
        });
      });
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    if (!user) return;
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    setItems((prevItems) => {
      const activeIndex = prevItems.findIndex((item) => item.id === activeId);
      const overIndex = prevItems.findIndex((item) => item.id === overId);

      return arrayMove(prevItems, activeIndex, overIndex);
    });

    setActiveId(null);

    const activePost = items.find((item) => item.id === activeId);

    if (activePost) {
      try {
        await AppSdk.putData(`/api/post`, {
          id: activeId,
          title: activePost.title,
          status: activePost.status,
          board: activePost.board,
          upvoters: activePost.upvoters,
        });
      } catch (error) {
        console.error('Failed to update post status:', error);
        toast.error('Failed to update post status');
      }
    }
  };

  useEffect(() => {
    if (user === null || user === undefined) {
      const timeout = setTimeout(() => {
        toast.error('You must be logged in to use the Drag and Drop feature');
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [user]);

  return (
    <div className='h-[calc(100vh-175px)] pb-4 '>
      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className='grid grid-cols-3 gap-3  overflow-y-hidden h-full'>
          <div className='rounded-md bg-[#F8F8F8] border border-[#ECECEC] px-3 py-2'>
            <div
              className={`text-sm border-b py-1 font-semibold border-[#E8E8E8] flex items-center gap-1 text-[#EC4899]`}
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
                  <SortableContext
                    items={todoPosts.map((post) => post.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {todoPosts.length > 0 ? (
                      todoPosts.map((post: Post) => {
                        return <DraggablePostCard post={post} key={post.id} />;
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
                  </SortableContext>
                </div>
              )}
            </div>
          </div>
          <div className='rounded-md bg-[#F8F8F8] border border-[#ECECEC] px-3 py-2'>
            <div
              className={`text-sm border-b py-1 font-semibold border-[#E8E8E8] flex items-center gap-1 text-[#FFAA00]`}
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
                  <SortableContext
                    items={inProgressPosts.map((post) => post.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {inProgressPosts.length > 0 ? (
                      inProgressPosts.map((post: Post) => {
                        return (
                          <DraggablePostCard
                            post={post}
                            key={`${post.id}-${activeId}`}
                          />
                        );
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
                  </SortableContext>
                </div>
              )}
            </div>
          </div>
          <div className='rounded-md bg-[#F8F8F8] border border-[#ECECEC] px-3 py-2'>
            <div
              className={`text-sm border-b py-1 font-semibold border-[#E8E8E8] flex items-center gap-1 text-[#059669]`}
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
                  <SortableContext
                    items={completedPosts.map((post) => post.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {completedPosts.length > 0 ? (
                      completedPosts.map((post: Post) => {
                        return <DraggablePostCard post={post} key={post.id} />;
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
                  </SortableContext>
                </div>
              )}
            </div>
          </div>
        </div>
      </DndContext>
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

export const DraggablePostCard = ({ post }: { post: Post }) => {
  const { user } = useUser();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: post.id,
      disabled: !user,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(user ? attributes : {})}
      {...(user ? listeners : {})}
    >
      <PostCard post={post} />
    </div>
  );
};
