import React, { useState, useEffect } from 'react'
import { BsPlusSquare } from 'react-icons/bs';
import { Link, useNavigate } from "react-router-dom";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BiBorderAll } from 'react-icons/bi';
import { IoIosArrowBack } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProfileUsers, profileSelector } from '../../features/getDataProfileSlice';
import { mappingProfile } from '../../utils/forEachData';
import noAvatar from '../../resources/img/noavatar.png';
import { createPosts } from '../../features/getDataPostSlice';

const NavbarAddPost = () => {
    // const [postPage, setPostPage] = useState(1);
    const profiles = useSelector(profileSelector.selectAll);
    const { users } = useSelector((state) => state.authentication);
    const [file, setFile] = useState('');
    const [caption, setCaption] = useState('');
    const [location, setLocation] = useState('');
    const [preview, setPreview] = useState('');
    const [isDetailPage, setIsDetailPage] = useState(false);
    const [isPostPage, setIsPostPage] = useState(false);
    const [msg, setMsg] = useState('');
    const dispatch = useDispatch();

    const handleClickModal = () => {
        setIsPostPage(prev =>  !prev);
        setIsDetailPage(prev => !prev);
    }

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image)
        setPreview(URL.createObjectURL(image));
    }

    const postData = async(e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('post', file);
        formData.append('caption', caption);
        formData.append('location', location);
        try {
            await dispatch(createPosts({ formData }));
            window.location.reload();
        } catch (error) {
            if(error.response){
                console.log(error.response.data.msg)
                setMsg(error.response.data.msg)
            }
        }
    }

    const handleRefresh = () => {
        window.location.reload();
      };

    useEffect(() => {
        dispatch(getAllProfileUsers())
      }, [dispatch, users]);
    const dataPicPro = mappingProfile(profiles, users);
  return (
    <div className='bg-bg-instagram fixed w-[100%]'>
        <div className="instagramLogo px-3 py-0.5 grid grid-cols-4 items-center">
            <div className='col-span-3'>
                <h5 className='text-white font-billabong text-[24px]'>Instagram</h5>
            </div>
            <div className="buttonPostAndLike flex gap-4 justify-end items-center">
                <button onClick={handleClickModal}>
                    <BsPlusSquare className='text-white hover:text-[16.5px] transition duration-300 ease-in-out' />
                </button>
                <div className="">
                <form onSubmit={postData}>
                    {(() => {
                        if(isPostPage && !preview) return (
                                <div className="absolute right-11 top-11 ">
                                <label htmlFor="img" className='text-white flex items-center gap-3 text-[14px] bg-zinc-800 rounded-md px-3 py-3'>Postin...<BiBorderAll /></label>
                                <input type='file' 
                                className="hidden" 
                                id='img'
                                onChange={loadImage}/>
                                </div>
                            )
                        else return (
                        <React.Fragment>
                            {preview && isDetailPage ? (
                                <div className="absolute left-0 top-0 bg-bg-instagram w-full h-[100vh] ">
                                    <div className="text-white">
                                        <div className="grid grid-flow-col justify-between p-2 border-b border-zinc-600 border-opacity-50">
                                            <button onClick={handleRefresh} className="text-white text-[26px]"><IoIosArrowBack />
                                            </button>
                                            <div className="">
                                                <h5 className='font-semibold ml-5'>Postingan Baru</h5>
                                            </div>
                                            <div className="">
                                                <button type='submit' className='text-blue-500 
                                                px-2 font-semibold'>Bagikan</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between px-5 py-3 gap-4">
                                        <div className="">
                                            <img className='w-[30px] max-w-[30px] rounded-full' alt='img' src={users && dataPicPro[users.uuid] &&dataPicPro[users.uuid] ? users && dataPicPro[users.uuid] : noAvatar}/>
                                        </div>
                                        <div className="mr-10">
                                            <input 
                                            type="text"
                                            value={caption}
                                            onChange={(e) => setCaption(e.target.value)}
                                            className='max-h-[60px] overflow-x px-2 bg-black  text-white outline-none'/>
                                        </div>
                                        <div className="">
                                            {preview ? (
                                                <img src={preview} className='w-[35px] max-w-[35px]' alt="img" />
                                            ) : ''}
                                        </div>
                                    </div>
                                    <div className="bg-story h-[100vh] border-t border-zinc-500 border-opacity-25">
                                        <div className="pt-3">
                                            <input 
                                            type="text" 
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className='w-full h-10 border-y border-zinc-700 border-opacity-25 p-2 outline-none bg-bg-instagram text-white'
                                            placeholder='Tambahkan Lokasi'/>
                                        </div>
                                        <div className="pt-3">
                                            <input 
                                            type="text" 
                                            className='w-full h-10 border-y border-zinc-700 border-opacity-25 p-2 outline-none bg-bg-instagram text-white'
                                            placeholder='Tandai Orang'/>
                                        </div>
                                    </div>
                                </div>
                            ) : ''}
                        </React.Fragment>
                        )
                    })()}
                </form>
                </div>
                <Link to='/login' className={`${preview ? `` : `before:p-[3.5px] before:absolute before:right-[8px] before:rounded before:border-[1px] before:border-bg-instagram before:bg-red-700`}`}>
                    <FontAwesomeIcon icon={faHeart} className="text-white text-[18px]"/>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default NavbarAddPost