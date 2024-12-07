import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = () => {
    const {currentUser} = useSelector(state => state.user);
    
  return (
    <div className='bg-gray-200'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
            <h1 className='font-bold'>USER APP</h1>
            <ul className='flex gap-4'>
                <Link to='/'>
                    <li>{currentUser && currentUser.isAdmin ? 'Admin Home' : 'Home'}</li>
                </Link>
                <Link to='/profile'>
                    {currentUser ? (
                        <img 
                            src={currentUser.profilePicture} 
                            alt="profile"
                            className='h-7 w-7 rounded-full object-cover'
                        />
                    ):(
                     <li>Sign In</li>
                    )}
                </Link>
            </ul>
        </div>
    </div>
  )
}

export default Header