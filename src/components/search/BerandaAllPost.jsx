import React, { useState, useEffect} from 'react';
import { postSelector, getAllPostUsers } from '../../features/getDataPostSlice';
import { useDispatch, useSelector } from 'react-redux';

const BerandaAllPost = () => {
  const posts = useSelector(postSelector.selectAll);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPostUsers());
  }, [dispatch])

  return (
    <div className='bg-bg-instagram'>
      <div className="grid grid-cols-3 gap-0.5 mb-0.5 py-12">
      {posts.map((post, id) => (
        <div className="" key={post.uuid}>
          <div className="flex items-center justify-center">
            <img src={post.url} className='w-[8rem] h-[9rem] max-w-[8rem] max-h-[9rem] object-cover'/>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default BerandaAllPost