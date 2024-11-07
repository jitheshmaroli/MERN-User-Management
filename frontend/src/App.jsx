import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Register from './Pages/register'
import Home from './pages/Home'
import Login from './Pages/login'
import Profile from './pages/profile'
import Header from './components/Header'

function App() {

  return( 
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<Login />} />
        <Route path='/sign-up' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </BrowserRouter>)
}

export default App
