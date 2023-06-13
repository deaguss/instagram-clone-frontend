import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { profileSelector, getAllProfileUsers } from '../../features/getDataProfileSlice';
import { postSelector } from '../../features/getDataPostSlice';
import { getAllPostUsers } from '../../features/getDataPostSlice';
import { useDispatch } from 'react-redux';
import { getMe } from '../../features/authSlice';
import { postsUser } from '../../utils/forEachData';
import { BiBorderAll, BiBookmark } from 'react-icons/bi';
import { MdOutlineSplitscreen, MdOutlineVideoLibrary, MdPermContactCalendar } from 'react-icons/md';
import OwnPost from './ownPost';
import noAvatar from '../../resources/img/noavatar.png';

const ProfileDetail = () => {
    const profiles = useSelector(profileSelector.selectAll);
    const posts = useSelector(postSelector.selectAll);
    const { users } = useSelector((state => state.authentication));
    const [changePage, setChangePage] = useState(1);
    const dispatch = useDispatch();

    const profileData = (profiles, users) => {
        const filtering = profiles.filter((profile) => profile.user?.uuid === users?.uuid)
        return filtering;
    }

    const getAllPostUser = () => {
        const dataPost = posts.filter((post) => postsUserByUuid[post.user.uuid]);
        const len = dataPost.length;

        return (
            <p>{len === null ? '0' : len}</p>
        )
    }
    useEffect(() => {
        dispatch(getMe());
        dispatch(getAllProfileUsers());
        dispatch(getAllPostUsers());
    }, [dispatch])

    const pictureProfile = profileData(profiles, users);
    const postsUserByUuid = postsUser(posts, users);
  return (
    <div className='bg-bg-instagram h-[100vh] pt-10'>
        <div className="text-white flex justify-between px-6 py-2 items-center">
            <div className="">
                <img src={users && pictureProfile[0]?.url_pic ? users && pictureProfile[0]?.url_pic : noAvatar} alt='img' className='w-[80px] rounded-full border border-zinc-400 border-opacity-50' />
            </div>
            <div className="">
                <div className="">
                    <h5 className='text-[18px]'>{users && users?.username}</h5>
                </div>
                <div className="mt-1">
                    <button className='w-[220px] py-1.5 rounded-lg bg-slate-100 text-black text-[12px] max-w-[220px] font-semibold'>Edit profile</button>
                </div>
                <div className="mt-2">
                    <button className='w-[220px] py-1.5 rounded-lg bg-slate-100 text-black text-[12px] max-w-[220px] font-semibold'>Fitur iklan</button>
                </div>
            </div>
        </div>
        <div className="text-white px-6 mr-24">
            <div className="">
                <h5 className='text-[17px] capitalize'>{users && pictureProfile[0]?.user.full_name ? users && pictureProfile[0]?.user.full_name : users && users.username}</h5>
            </div>
            <div className="">
                <p className='text-[12px] capitalize text-zinc-400'>{users && pictureProfile[0]?.kategori ? users && pictureProfile[0]?.kategori : ''}</p>
            </div>
            <div className="">
                <p className='text-[14px]'>{users && pictureProfile[0]?.bio ? users && pictureProfile[0]?.bio : ''}</p>
            </div>
            <div className="">
                <a href={`https://${users && pictureProfile[0]?.link_web}`} className='underline text-[12px] text-blue-200 font-semibold'>{users && pictureProfile[0]?.link_web ? users && pictureProfile[0]?.link_web : ''}</a>
            </div>
        </div>
        <div className="bg-bg-instagram max-h-[4rem] h-[4rem] border-y border-zinc-300 mt-8 border-opacity-25 grid grid-flow-col text-white text-[14px] place-items-center">
            <div className="flex flex-col items-center">
                <div className="">
                    {getAllPostUser()}
                </div>
                <p className='text-zinc-400'>kiriman</p>
            </div>
            <div className="flex flex-col items-center">
                <p>{`${users && pictureProfile[0]?.jumlah_follower ? users && pictureProfile[0]?.jumlah_follower : '0'}`}</p>
                <p className='text-zinc-400' >pengikut</p>
            </div>
            <div className="flex flex-col items-center">
                <p>{`${users && pictureProfile[0]?.mengikuti  ? users && pictureProfile[0]?.mengikuti : '0'}`}</p>
                <p className='text-zinc-400' >diikuti</p>
            </div>
        </div>
        <div className="text-zinc-400 grid grid-flow-col place-items-center py-3">
            <div className="">
                <button onClick={() => setChangePage(1)}><BiBorderAll className={`text-[26px] ${changePage === 1 ? 'text-zinc-200' : ''} transform ease-in-out duration-200`}/>
                </button>
            </div>
            <div className="">
                <button onClick={() => setChangePage(2)}><MdOutlineSplitscreen className={`text-[26px] ${changePage === 2 ? 'text-zinc-200' : ''} transform ease-in-out duration-200`}/>
                </button>
            </div>
            <div className="">
                <button onClick={() => setChangePage(3)}><MdOutlineVideoLibrary className={`text-[26px] ${changePage === 3 ? 'text-zinc-200' : ''} transform ease-in-out duration-200`} />
                </button>
            </div>
            <div className="">
                <button onClick={() => setChangePage(4)}><BiBookmark className={`text-[26px] ${changePage === 4 ? 'text-zinc-200' : ''} transform ease-in-out duration-200`}/>
                </button>
            </div>
            <div className="">
                <button onClick={() => setChangePage(5)}><MdPermContactCalendar className={`text-[26px] ${changePage === 5 ? 'text-zinc-200' : ''} transform ease-in-out duration-200`}/>
                </button>
            </div>
        </div>
        <div className="">
            <div className="text-white bg-bg-instagram pb-14">
            {(() =>{
            switch (changePage) {
                case 1:
                    return <OwnPost />;
                default:
                    return <p className='flex items-center justify-center font-semibold'>coming soon...</p>
            }})()}
            </div>
        </div>
    </div>
  )
}

export default ProfileDetail