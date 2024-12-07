import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './Pages/register'
import Home from './pages/Home'
import Profile from './pages/profile'
import Header from './components/Header'
import Login from './Pages/login'
import PrivateRoute from './components/PrivateRoute'
import { useSelector } from 'react-redux'
import { UsersTable } from './pages/UsersTable'
import AdminHome from './pages/AdminHome'


function App() {
  const {currentUser} = useSelector(state => state.user);

  return( 
    <BrowserRouter>
    <Header />
      <Routes>
          <Route path='/sign-up'  element={currentUser ? <Navigate to='/' replace /> : <Register />} />
          <Route path='/sign-in'  element={currentUser ? <Navigate to='/' replace /> :<Login />} />
          <Route element={<PrivateRoute />} >
            <Route path='/users' element={<UsersTable />} />
            <Route path='/' element={currentUser?.isAdmin? <AdminHome /> : <Home />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
      </Routes>
    </BrowserRouter>)
}

export default App
