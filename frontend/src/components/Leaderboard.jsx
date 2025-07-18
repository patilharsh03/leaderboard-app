function Leaderboard({ data }) {
  const getRankColor = (rank) => {
    switch (rank) {
      case 1:
        return "bg-yellow-300 text-black font-bold"; // Gold
      case 2:
        return "bg-gray-300 text-black font-semibold"; // Silver
      case 3:
        return "bg-orange-300 text-black font-semibold"; // Bronze
      default:
        return "bg-white";
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">🏆 Current Rankings</h2>
      <div className="rounded-lg overflow-hidden border">
        <table className="w-full text-left">
          <thead className="bg-blue-50 border-b">
            <tr>
              <th className="p-3">Rank</th>
              <th className="p-3">Name</th>
              <th className="p-3">Total Points</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, idx) => (
              <tr key={user._id} className={`border-t ${getRankColor(idx + 1)}`}>
                <td className="p-3">{idx + 1}</td>
                <td className="p-3">{user.name}</td>
                <td className="p-3 font-medium">{user.totalPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Leaderboard;