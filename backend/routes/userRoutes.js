const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  claimPoints,
  getLeaderboard,
  getHistory,
} = require("../controllers/userController");

router.post("/users", createUser);
router.get("/users", getUsers);
router.post("/claim/:userId", claimPoints);
router.get("/leaderboard", getLeaderboard);
router.get("/history", getHistory);

module.exports = router;