import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    const [formData, setFormData] = useState({});
    const {loading, error} = useSelector((state) => state.user);
    const [formErrors, setFormErrors] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleChange = (e) => {
        setFormData({...formData, [e.target.id] : e.target.value})
    };

    const validateForm = () => {
        let errors = {};
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Valid email is required';
        if (!formData.password || formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm();
        if(Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
       try {
            dispatch(signInStart());
            const response = await fetch("/api/auth/sign-in", {
                method: 'POST',
                headers: {
                    'Content-Type' :'application/json'
                 },
                 body: JSON.stringify(formData),
                 credentials: 'include'
            });
            const data = await response.json();
            if(!response.ok) {
                dispatch(signInFailure(data));
                return;
            }
            dispatch(signInSuccess(data));
            navigate('/');
       } catch (error) {
            dispatch(signInFailure(error));
       }
    }

  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>
            Sign In
        </h1>
        <p className='text-red-800 my-4 text-center'>{error ? error.message || "something went wrong" : ''}</p>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <input 
                type="email"
                placeholder='Email'
                id='email'
                className='bg-slate-100 p-3 rounded-lg'
                onChange={handleChange}
            />
            {formErrors.email && <p className="text-red-500">{formErrors.email}</p>}
            <input 
                type="password"
                placeholder='Password'
                id='password'
                className='bg-slate-100 p-3 rounded-lg'
                onChange={handleChange}
            />
            {formErrors.password && <p className="text-red-500">{formErrors.password}</p>}
            <button 
                disabled={loading}
                className='bg-black text-white p-3
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