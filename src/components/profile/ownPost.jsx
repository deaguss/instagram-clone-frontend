import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { postSelector } from '../../features/getDataPostSlice';
import { getAllPostUsers } from '../../features/getDataPostSlice';
import { useDispatch } from 'react-redux';
import { getMe } from '../../features/authSlice';
import { BsFilePostFill } from 'react-icons/bs';

const OwnPost = () => {
    const { users } = useSelector((state  => state.authentication))
    const posts = useSelector(postSelector.selectAll);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getMe())
        dispatch(getAllPostUsers());
    }, [dispatch])
  return (
    <div>
        <div>
            {(() => {
            const filterPostByUuid = posts.filter((postFil) => postFil.user?.uuid === users?.uuid);

            const dataPostsUser = {}

            filterPostByUuid.forEach((postEach) => {
                if(dataPostsUser[users?.uuid]){
                    dataPostsUser[users?.uuid].push(postEach);
                }else {
                    dataPostsUser[users?.uuid] = [postEach];
                }
            });
            return(
                <div >
                    {dataPostsUser[users?.uuid] ? (
                        <div className="grid grid-cols-3 gap-1">
                            {dataPostsUser[users?.uuid] && dataPostsUser[users?.uuid].map((url) => (
                                <img src={url?.url} className='w-[8rem] h-[9rem] max-w-[8rem] max-h-[9rem] object-cover' key={url?.uuid} alt='img'/>
                            ))}
                        </div>
                    ) : 
                    (
                        <div className="flex  flex-col justify-center items-center mt-10 text-zinc-500">
                            <div className=""><BsFilePostFill className='text-[50px]'/></div>
                            <h5 className='font-semibold mt-3'>Belum ada postingan</h5>
                        </div>
                    )
                    }
                </div>
            );
            })()} 
        </div>
    </div>
  )
}

export default OwnPost