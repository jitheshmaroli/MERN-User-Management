import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Avatar,
  IconButton,
  Tooltip,
  Chip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import EditUserForm from "../components/EditUserForm";
import AddUserForm from "../components/AddUserForm";

const TABLE_HEAD = ["User", "Email", "Role", "Joined Date", "Action"];
  
export function UsersTable() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // API request handlers
  const handleSave = async (updatedUser) => {
    try {
      console.log(updatedUser, 'this is usertable')
      // API call to update the user
      await fetch(`/api/admin/users/${updatedUser._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(updatedUser),
      });
      console.log(updatedUser)
      alert('User updated successfully!');
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
      );
      setFilteredUsers((prevFilteredUsers) =>
        prevFilteredUsers.map((user) => (user._id === updatedUser._id ? updatedUser : user))
      );
      handleCloseForm(); 
    } catch (error) {
      console.error('Failed to update user', error);
    }
  }
  const handleDelete = async (userId) => {
    try {
      await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      alert('User deleted successfully!');
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
      setFilteredUsers((prevFilteredUsers) => prevFilteredUsers.filter((user) => user._id !== userId));
      handleCloseForm(); // Close the form after deletion
    } catch (error) {
      console.error('Failed to delete user', error);
    }
  };

  const handleBlock = async (userId, blockStatus) => {
    try {
      await fetch(`/api/admin/users/${userId}/block`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ isBlocked: blockStatus }),
      });
      alert(`User ${blockStatus ? 'blocked' : 'unblocked'} successfully!`);
    } catch (error) {
      console.error('Failed to update block status', error);
    }
  };

  const handleAddUser = async (newUser) => {
    try {
      const response = await fetch('/api/admin/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(newUser),
      });
      if (!response.ok) throw new Error("Failed to add user");
      alert("User added successfully!");
      setUsers((prevUsers) => [...prevUsers, newUser]); // Update users list
      setFilteredUsers((prevFilteredUsers) => [...prevFilteredUsers, newUser]);
      setShowAddUserForm(false); // Close the modal
    } catch (error) {
      console.error("Failed to add user", error);
    }
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredUsers(
      users.filter(
        (user) =>
          user.userName.toLowerCase().includes(term) ||
          user.email.toLowerCase().includes(term) ||
          (user.isAdmin ? "admin" : "user").includes(term)
      )
    );
    console.log(filteredUsers)
  };

  // Button handler to open the AddUserForm modal
  const handleOpenAddUserForm = () => setShowAddUserForm(true);
  const handleCloseAddUserForm = () => setShowAddUserForm(false);

  // Handlers for opening and closing the edit form modal
  const handleEditClick = (user) => setSelectedUser(user);
  const handleCloseForm = () => setSelectedUser(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/users', {
          method: 'GET',
          credentials: 'include',
        });
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  },[])
  
  if (!users || !filteredUsers) return <div>Loading...</div>;
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Members list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all members
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm" >
              view all
            </Button>
            <Button className="flex items-center gap-3" size="sm" onClick={handleOpenAddUserForm}>
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
      {filteredUsers.length > 0 ? (
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(
              (user, index) => {
                const isLast = index === filteredUsers.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={user._id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={user.profilePicture} alt={users.userName} size="sm" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {user.userName}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {user.email}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={user.isAdmin ? "Admin" : "User"}
                          color={user.isAdmin ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {new Date(user.createdAt).toDateString()}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Tooltip content="Edit User">
                        <IconButton variant="text">
                          <PencilIcon onClick={() => handleEditClick(user)} className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
        ) : (
          <div className="flex justify-center items-center h-48">
            <Typography color="gray" className="text-center">
              No users found
            </Typography>
          </div>
        )}
         {/* EditUserForm Modal */}
          {selectedUser && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <EditUserForm
                  user={selectedUser}
                  onSave={handleSave}
                  onDelete={handleDelete}
                  onBlock={handleBlock}
                />
                <button
                  onClick={handleCloseForm}
                  className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          )}
           {/* AddUserForm Modal */}
            {showAddUserForm && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                  <AddUserForm
                    onSave={handleAddUser}
                    onClose={handleCloseAddUserForm}
                  />
                  <button
                    onClick={handleCloseAddUserForm}
                    className="mt-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
      </CardBody>
    </Card>
  )}