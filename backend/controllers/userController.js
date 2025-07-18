const User = require("../models/User");
const History = require("../models/History");

// Create new user
exports.createUser = async (req, res) => {
  try {
    const { name } = req.body;
    const newUser = await User.create({ name });
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Claim random points
exports.claimPoints = async (req, res) => {
  try {
    const { userId } = req.params;
    const points = Math.floor(Math.random() * 10) + 1;

    const user = await User.findByIdAndUpdate(
      userId,
      { $inc: { totalPoints: points } },
      { new: true }
    );

    if (!user) return res.status(404).json({ error: "User not found" });

    await History.create({ userId, pointsClaimed: points });

    res.json({ user, pointsClaimed: points });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get leaderboard
exports.getLeaderboard = async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all claim history
exports.getHistory = async (req, res) => {
  try {
    const history = await History.find().sort({ timestamp: -1 }).populate("userId", "name");
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};