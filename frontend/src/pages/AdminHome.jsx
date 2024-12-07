import { useNavigate } from "react-router-dom"

const AdminHome = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/users');
    }
  return (
    <div className="flex justify-center items-center pt-20">
        <div className=" flex flex-col items-center p-5 rounded shadow-lg bg-white">
            <h2> Welcome to the Admin dashboard</h2>
            <button onClick={handleClick} className="bg-black text-white px-2 mt-2 py-1 rounded w-max hover:shadow-xl">Users List</button>
        </div>
    </div>
  )
}

export default AdminHome