function ClaimButton({ onClaim, disabled }) {
  return (
    <button
      onClick={onClaim}
      disabled={disabled}
      className={`px-4 py-2 rounded text-white font-semibold ${
        disabled ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
      }`}
    >
      Claim Points
    </button>
  );
}

export default ClaimButton;