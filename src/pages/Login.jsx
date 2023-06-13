import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { userLogin } from '../features/authSlice';
import { reset } from '../features/authSlice';
import { AiFillFacebook } from 'react-icons/ai'

const Login = () => {
  const[username, setUsername] = useState('');
  const[email, setEmail] = useState('');
  const[phone, setPhone] = useState('');
  const[password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, isLoading, isSuccess, isError, message} = useSelector((state) => state.authentication);

  const authentication = (e) => {
    e.preventDefault()
    const user = {
      username: username || undefined,
      email: email || undefined,
      phone_number: phone || undefined
    }
    dispatch(userLogin({...user, password}));
  }

  useEffect(() => {
  if(users || isSuccess){
    navigate('/beranda');
  }
    dispatch(reset());
  }, [users, isSuccess, dispatch, navigate])

  return (
    <div className="h-screen px-10 flex items-center justify-center">
    <div className="w-full max-w-md mx-auto p-8">
      <h3 className='text-center mb-10 text-[45px] font-medium font-billabong'>Instagram</h3>
      <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1.5 w-full max-w-md mx-auto rounded-lg focus:outline-none  focus:shadow-outline flex items-center mb-10 justify-center text-[12px]" 
        >
        <AiFillFacebook className='text-[18px]'/>&nbsp;Continue with Facebook
      </button>
      <div className="text-center relative">
        <hr className='mb-10'/>
        <span className='absolute top-0 -mt-2 left-[38%] bg-white text-zinc-400 px-5 text-[11px]'>OR</span>
      </div>
      <form onSubmit={authentication}>
        <div className="mb-4">
          <input
            className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-[11px] text-[10px]"
            type="text"
            placeholder='Phone number, username, or email'
            value={username || email || phone}
            onChange={(e) => setUsername(e.target.value) || setEmail(e.target.value) || setPhone(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <input
            className="appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder:text-[11px] text-[10px]"
            id="password"
            placeholder='Password'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        
          />
        </div>
        <div className="flex items-center justify-end mb-5">
          <a
            className="inline-block align-baseline text-[12px] text-blue-500 hover:text-blue-800"
            href="#"
          >
            Forgot password?
          </a>
        </div>
        <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1.5 w-full max-w-md mx-auto rounded-lg focus:outline-none focus:shadow-outline mb-5 text-[14px]"
            type="submit"
          >{isLoading ? 'Loading...' : 'Log in'}
        </button>
        <div className="isError justify-center flex items-center mb-5">{isError ? <div>{isError && <p className='text-center text-[11px] text-red-600'>{message}</p>}</div> : <p className='text-[11px] invisible'>Lorem ipsum dolor sit amet, consectetur Lorem ipsum</p>}
        </div>
        <div className="signup text-center">
          <span className='text-[13px]'>Don't have an account? <Link className='text-blue-400 font-semibold'>Sign up</Link></span>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Login