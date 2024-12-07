import { useState } from 'react';
import PropTypes from 'prop-types';

function EditUserForm({ user, onSave, onDelete, onBlock }) {
  const [name, setName] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [isBlocked, setIsBlocked] = useState(user.isBlocked);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name || name.length < 3) {
      newErrors.name = "Name must be at least 3 characters long.";
    }
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!email || !emailPattern.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if(validateForm()) {
        console.log('selected user', user, name, email)
        onSave({ ...user, userName: name, email, isBlocked });
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      onDelete(user._id);
    }
  };

  const handleBlockToggle = () => {
    setIsBlocked(!isBlocked);
    onBlock(user._id, !isBlocked);
  };

  EditUserForm.propTypes = {
    user: PropTypes.shape({
      userName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      isBlocked: PropTypes.bool.isRequired,
      _id: PropTypes.string.isRequired,
    }),
    onSave: PropTypes.func.isRequired,
    onDelete: PropTypes.func, // Optional prop
    onBlock: PropTypes.func, // Optional prop
  };
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Edit User</h2>
      <form onSubmit={handleSave}>
        <div className="mb-4">
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </div>
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isBlocked}
            onChange={handleBlockToggle}
            className="mr-2"
          />
          <label className="text-gray-700">Block User</label>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Delete User
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUserForm;
