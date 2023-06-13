import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMe } from '../features/authSlice';
import { IoIosArrowBack } from 'react-icons/io';
import { FaTelegramPlane } from 'react-icons/fa';
import CreateComment from '../components/komentar/CreateComment';
import noAvatar from '../resources/img/noavatar.png';
import { dateGlobalById } from "../utils/postTimes";
import BottomNavbar from '../components/beranda/bottomNavbar';
import { getALLComments } from '../features/getDataComments';
import { commentSelector } from '../features/getDataComments';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getAllProfileUsers, profileSelector } from '../features/getDataProfileSlice';
import { dateGlobalComments } from '../utils/postTimes';
import { postSelector, getPostUsersById } from '../features/getDataPostSlice';

const Komentar = () => {
    const { message, isError } = useSelector((state => state.authentication));
    const { id } = useParams();
    const comments = useSelector(commentSelector.selectAll);
    const profiles = useSelector(profileSelector.selectAll);
    const [postData, setPostData] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const post = useSelector((state) => {
        const posts = postSelector.selectAll(state);
        return posts.find(post => post.uuid === id);
    });

    const getProfilePic = (uuid, profiles) => {
    const profile = profiles.find((profile) => profile.user.uuid === uuid);
    return profile ? profile.url_pic : '';
    };

    const getUsername = (uuid, profiles) => {
    const profile = profiles.find((profile) => profile.user.uuid === uuid);
    return profile ? profile.user.username : '';
    };

    useEffect(() => {
        if(post){
            setPostData([post])
        }
    }, [post]);

    useEffect(() => {
        dispatch(getAllProfileUsers());
        dispatch(getALLComments());
        dispatch(getMe());
        dispatch(getPostUsersById({ id }));
    }, [dispatch, id]);


    useEffect(() => {
        if(isError){
          navigate("/login");
        }
      },[isError, message, navigate]);
  return (
    <div className='bg-bg-instagram w-[100%]'>
        <BottomNavbar>
            <div className="fixed bg-bg-instagram">
                <div className="grid grid-flow-col max-w-[100%] max-h-[3.1rem] h-[3.1rem] justify-between items-center px-5">
                    <Link to='/beranda' className="text-white text-[26px]"><IoIosArrowBack /></Link>
                    <div className="text-white text-[16px]"><h5 className='font-semibold'>Komentar</h5></div>
                    <div className="text-white text-[26px]"><FaTelegramPlane /></div>
                </div>
                <div className="">
                    <CreateComment />    
                </div>
            </div>
            <div className="text-white bg-bg-instagram h-[100vh] pt-28">
                {postData.map((post, i) => (
                    <div key={post.uuid} className='flex p-5 gap-5 border-b-2 border-white border-opacity-10'>
                        <div className="">
                            <div className="">{postData.map((post) => {
                                const profileUsers = profiles.filter((profile) => post.user.uuid === profile.user.uuid);
                                const profilePicUsers = {}
                                profileUsers.forEach((profile) => {
                                    profilePicUsers[post.user.uuid] = profile;
                                    // console.log(profilePicUsers[post.user.uuid])
                                })
                                return(
                                    <img src={profilePicUsers[post.user.uuid].url_pic || noAvatar} alt="img" className='w-[40px] max-w-[40px] rounded-full' key={post.uuid}/>
                                )
                            })}
                            </div>
                        </div>
                        <div className="">
                            <div className="">
                                <h5 className='font-semibold'>{post.user.username}</h5>
                            </div>
                            <div className="-mt-1s items-start pr-10">
                                <h5>{post.caption || ''}</h5>
                            </div>
                            <div className="">
                                <h5 className='text-zinc-400 mt-1 text-sm'>{dateGlobalById(post.createdAt)}</h5>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="pb-20 bg-bg-instagram">
                {postData.map((post) => {
                    const commentPost = comments.filter((comment) => comment.post.uuid === post.uuid);
                    const dataCommentsUsers = {};
                    commentPost.forEach((comment) => {
                        dataCommentsUsers[comment.user.uuid] = dataCommentsUsers[comment.user.uuid] || [];
                        dataCommentsUsers[comment.user.uuid].push(comment);
                    });
                    return (
                    <div className="" key={post.uuid}>
                        {Object.keys(dataCommentsUsers).length > 0 ? (
                        Object.keys(dataCommentsUsers).map((userUuid) => (
                            <div key={userUuid}>
                            {dataCommentsUsers[userUuid].map((result) => (
                                <div className="px-5 py-4 flex gap-5" key={result.uuid}>
                                <div className="">
                                    <img src={getProfilePic(result.user.uuid, profiles)} alt="PP" className="max-w-[40px] rounded-full" />
                                </div>
                                <div className="w-[70%] max-w-[70%]">
                                    <div className="">
                                    <p><b className='mr-1.5'>{getUsername(userUuid, profiles)}</b>{result.comment}</p>
                                    </div>
                                    <div className="flex gap-2 text-zinc-300 text-[13px]">
                                    <p>{dateGlobalComments(result.createdAt)}</p>
                                    <button>10 suka</button>
                                    <button>Balas</button>
                                    </div>
                                </div>
                                <div className="">
                                    <FontAwesomeIcon icon={faHeart} />
                                </div>
                                </div>
                            ))}
                            </div>
                        ))
                        ) : (
                        ''
                        )}
                    </div>
                    )
                })}
                </div>
            </div>
        </BottomNavbar>
    </div>  
  )
}

export default Komentar