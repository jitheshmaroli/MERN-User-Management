import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.id] : e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
       try {
           setLoading(true);
           setError(false);
            const response = await fetch("/api/auth/sign-in", {
                method: 'POST',
                headers: {
                    'Content-Type' :'application/json'
                 },
                 body: JSON.stringify(formData),
            });
            const data = await response.json();
            setLoading(false);
            if(data.success === false) {
                setError(true);
                return;
            }
            navigate('/');
       } catch (error) {
            setLoading(false);
            setError(true);
       }
    }

  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>
            Sign In
        </h1>
        <p className='text-red-800 my-4 text-center'>{error && "something went wrong"}</p>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input 
                type="email"
                placeholder='Email'
                id='email'
                className='bg-slate-100 p-3 rounded-lg'
                onChange={handleChange}
            />
            <input 
                type="password"
                placeholder='Password'
                id='password'
                className='bg-slate-100 p-3 rounded-lg'
                onChange={handleChange}
            />
            <button 
                disabled={loading}
                className='bg-slate-700 text-white p-3
                rounded-lg uppercase hover:opacity-95
                disabled:opacity-80'
            >
                {loading ? 'Loading...' : 'Sign In'}
            </button>
        </form>
        <div className='flex mt-3'>
            <p>Dont have an account?</p>
            <Link 
                to='/sign-up' 
            >
                <span className='text-blue-500'>Sign Up</span>
            </Link>
        </div>
    </div>
  )
}

export default Login;