import { useState } from "react";
import axios from "axios";

function AddUserForm({ onAdd }) {
  const [name, setName] = useState("");
  const API = "http://localhost:5000/api";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    await axios.post(`${API}/users`, { name });
    setName("");
    onAdd(); // refresh user list
  };

  return (
    <form onSubmit={handleSubmit} className="flex items gap-2 items-center mb-4">
      <input
        type="text"
        placeholder="Enter new user name"
        className="p-2 border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Add User
      </button>
    </form>
  );
}

export default AddUserForm;