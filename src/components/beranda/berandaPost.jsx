import React,{  useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllPostUsers, postSelector } from '../../features/getDataPostSlice';
import { doLikePost, fetchPostStatus, deleteLiked, likeSelector } from '../../features/likedSlice';
import { getAllProfileUsers, profileSelector } from '../../features/getDataProfileSlice';
import { BsThreeDots, BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { BiComment } from 'react-icons/bi';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaTelegramPlane } from 'react-icons/fa';
import { dateGlobal } from "../../utils/postTimes";
import { profilePic } from '../../utils/forEachData';
import noAvatar from '../../resources/img/noavatar.png';
import { getALLComments } from '../../features/getDataComments';
import { commentSelector } from '../../features/getDataComments';

const BerandaPost = () => {
  const dispatch = useDispatch();
  const posts = useSelector(postSelector.selectAll);
  const profiles = useSelector(profileSelector.selectAll);
  const[isBookMark, setIsBookMark] = useState(false);
  const profileData = profilePic(profiles, posts);
  const comments = useSelector(commentSelector.selectAll);
  const[isLike, setIsLike] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const buttonRef = useRef();
  
  useEffect(() => {
    dispatch(getAllPostUsers());
    dispatch(getAllProfileUsers());
    dispatch(getALLComments());
  }, [dispatch])
  
  const getLengthComment = (comments , post) => {
    const getAllComment = comments.filter((comment) => comment.post.uuid === post);
    const len = getAllComment.length;
    return(
      <div className="mt-1">
        {len ? <p>Lihat semua {len} komentar</p> : ''}
      </div>
    )
  }
  
  const handleBookmarkClick = () => {
    setIsBookMark((prevSaved) => !prevSaved)
  }
  
  // fitur lagi perbaikan

  // const handleLikeClick = async (postId, isLike, setIsLike, setIsActive, dispatch) => {
  //   if (isLike && postId) {
  //     try {
  //       await dispatch(deleteLiked({ deleteId: postId }));
  //       setIsLike(prev => !prev);
  //       setIsActive(null);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   } else if (!isLike && postId) {
  //     try {
  //       await dispatch(doLikePost({ postId: postId, like: !isLike }));
  //       setIsLike(prev => !prev);
  //       setIsActive(postId); // ubah nilai isActive
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // };

  // const getLengthLikes = async () => {
  //   const postId = buttonRef.current?.id;
  //   const response = await dispatch(fetchPostStatus(postId));
  //   posts.filter((post) => {
  //     const postUuid = post.uuid === response.payload.post.uuid;
  //     return setLikesCount([postUuid].length)
  //   })

  // }

  // useEffect(() => {
  //   const postId = buttonRef.current?.id;
  //   const checkLikeStatus = async () => {
  //     try {
  //       const postId = buttonRef.current?.id;
  //       const response = await dispatch(fetchPostStatus(postId));
  //       setIsLike(response.like);
  //       setIsActive(response.like ? postId : null);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
    
  //   if (postId) {
  //     checkLikeStatus();
  //   }

  // }, [buttonRef]);
  
  const handleClickLike = () => {
    setIsLike(prev => !prev)
  }
    return (
      <>{posts.map((post, i) => (
        <div className='grid bg-bg-instagram max-w-full' key={post.uuid}>
        <div className="max-h-[4rem] grid grid-rows-4 grid-flow-col p-2">
            <div className="text-white row-span-4 grid place-items-center">
              <img className='w-[40px] h-[40px] max-w-[40px] max-h-[40px] rounded-full' src={profileData[post.uuid] || noAvatar} ></img>
            </div>
          <div className="text-white col-span-3 row-span-2 text-[15px] font-medium">
            {post.user.username}
          </div>
          <div className="text-white row-span-2 col-span-3 text-[11px]">
            {post.location ? post.location : ''}
          </div>
          <div className="text-white row-span-4 grid place-items-center">
            <BsThreeDots className='text-[20px]'/>
          </div>
        </div>
        <div className="grid place-items-center">
            <img className='grid max-w-full h-[23rem] max-h-[23rem] justify-center items-center pointer-events-none' src={post.url} alt='img'/>
        </div>
        <div className="grid grid-flow-col p-4">
          <div className=" grid grid-flow-col justify-start gap-6 items-center">
            <div className="">
            {/* <button onClick={() => handleLikeClick(buttonRef.current?.id, isLike, setIsLike, setIsActive, dispatch)} id={post.uuid} ref={buttonRef}>
              <FontAwesomeIcon
                icon={faHeart}
                className={`text-[20px] transition duration-75 ease-in-out ${
                  isActive === isLike ? "text-red-700 scale-125" : "text-white"
                }`}
              />
            </button> */}
            <button onClick={handleClickLike}>
            <FontAwesomeIcon
                icon={faHeart}
                className={`text-[20px] transition duration-75 ease-in-out ${
                isLike ? "text-red-700 scale-125" : "text-white"
                }`} />
            </button>
            </div>
            <div className="">
              <Link className=''
              to={`/komentar/${post.uuid}`}
              >
                <BiComment className='text-white text-[20px] -mt-0.5'/>
              </Link>
            </div>
            <div className="">
              <FaTelegramPlane className='text-white text-[20px] -mt-1'/>
            </div>
          </div>
          <div className="grid justify-end items-center">
            {isBookMark ? <BsBookmarkFill className='text-white text-[20px]' onClick={handleBookmarkClick}/> : <BsBookmark className='text-white text-[20px]' onClick={handleBookmarkClick}/>}
          </div>
        </div>
        <div className="grid px-5 -mt-2 pb-4">
          <div className="text-white">
            <p className='text-[13.5px] font-medium'>{likesCount ? <p>{likesCount} like</p> : ''}</p>
          </div>
          <div className="text-white grid grid-flow-col">
            <font className='font-semibold text-[14px]'>{post.user.username}&nbsp;{post.caption ? <font className='font-normal'>{post.caption}</font>: ''}</font>
          </div>
          <div className="-mt-1.5">
            <Link to={`/komentar/${post.uuid}`} className='text-zinc-500 text-[12px]'>{getLengthComment(comments, post.uuid)}</Link>
          </div>
          <div className="-mt-1">
            <font className='uppercase text-zinc-500 text-[11px]'>{dateGlobal(post.createdAt)}</font>
          </div>
        </div>
    </div>
    ))}
    </>
    )
}

export default BerandaPost