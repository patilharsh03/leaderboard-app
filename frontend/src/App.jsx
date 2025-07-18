import { useEffect, useState } from "react";
import axios from "axios";
import UserSelector from "./components/UserSelector";
import AddUserForm from "./components/AddUserForm";
import ClaimButton from "./components/ClaimButton";
import Leaderboard from "./components/Leaderboard";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [leaderboard, setLeaderboard] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const API = "https://leaderboard-app-production.up.railway.app/api"; // backend base

  const fetchUsers = async () => {
    const res = await axios.get(`${API}/users`);
    setUsers(res.data);
  };

  const fetchLeaderboard = async () => {
    const res = await axios.get(`${API}/leaderboard`);
    setLeaderboard(res.data);
  };

  const fetchHistory = async () => {
    const res = await axios.get(`${API}/history`);
    setHistory(res.data);
  };

  useEffect(() => {
    fetchUsers();
    fetchLeaderboard();
    fetchHistory();
  }, []);

  const handleClaim = async () => {
    if (!selectedUser) return;
    setLoading(true);
    await axios.post(`${API}/claim/${selectedUser}`);
    setLoading(false);
    fetchUsers();
    fetchLeaderboard();
    fetchHistory();
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header */}
      <header className="bg-gradient-to-r from-grey-600 to-indigo-500 text-black p-6 shadow text-center">
        <h1 className="text-3xl font-bold">🔥 Real-Time Leaderboard</h1>
        <p className="text-sm text-black/90">Add users, claim points & see rankings live</p>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Add User Form */}
        <AddUserForm
          onAdd={() => {
            fetchUsers();
            fetchLeaderboard();
          }}
        />

        {/* User Selection + Claim */}
        <div className="flex flex-col md:flex-row items-center gap-4">
          <UserSelector
            users={users}
            selected={selectedUser}
            setSelected={setSelectedUser}
          />
          <ClaimButton onClaim={handleClaim} disabled={!selectedUser || loading} />
        </div>

        {/* Leaderboard */}
        <Leaderboard data={leaderboard} />
      </main>
    </div>
  );
}

export default App;