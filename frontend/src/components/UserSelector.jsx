function UserSelector({ users, selected, setSelected }) {
  return (
    <select
      className="p-2 border rounded w-64"
      value={selected}
      onChange={(e) => setSelected(e.target.value)}
    >
      <option value="">Select a user</option>
      {users.map((user) => (
        <option key={user._id} value={user._id}>
          {user.name}
        </option>
      ))}
    </select>
  );
}

export default UserSelector;