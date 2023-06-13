import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProfileUsers, profileSelector } from '../../features/getDataProfileSlice';
import { mappingProfile } from '../../utils/forEachData';
import { createComments } from '../../features/getDataComments';
import { useParams } from 'react-router-dom';

const CreateComment = () => {
  const[komen, setKomen] = useState('');
  const profiles = useSelector(profileSelector.selectAll);
  const { users } = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const { id } = useParams();

  const comment = async(e) => {
    // e.preventDefault()
    try {
      await dispatch(createComments({ postId: id, comments: komen }));
      setKomen('');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    dispatch(getAllProfileUsers());
  }, [dispatch, users]);

  const dataPicPro = mappingProfile(profiles, users);
  return (
    <div className='w-[100%] flex gap-5 px-4 items-center h-[4rem] bg-zinc-900 border-t-4 border-black border-opacity-50'>
      <div className="">
        {users && dataPicPro[users.uuid] && <img className='w-[30px] max-w-[30px] rounded-xl' src={dataPicPro[users.uuid]}/>}
      </div>
      <div className="">
      <form onSubmit={comment}>
        <div className="">
          <input
            className="appearance-none border w-[300px] py-3 px-4 text-white leading-tight focus:outline-none focus:shadow-outlin border-opacity-20 border-white  placeholder:text-[13px] text-[12px] rounded-full bg-black"
            type="text"
            value={komen}
            onChange={(e) => setKomen(e.target.value)}
            placeholder='Tambahkan kometar...'
          />
          <div className="absolute right-[40px] top-[68px]">
            <button type='submit' className='font-semibold text-blue-600 bg-black px-2'>Kirim</button>
          </div>
        </div>
      </form>
      </div>
    </div>
  )
}

export default CreateComment