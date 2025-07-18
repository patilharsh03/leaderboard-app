const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const users = [
  "Rahul",
  "Kamal",
  "Sanak",
  "Riya",
  "Aman",
  "Tina",
  "Arjun",
  "Simran",
  "Dev",
  "Pooja",
];

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await User.deleteMany(); // Optional: clean existing users
    const userDocs = users.map((name) => ({ name }));
    await User.insertMany(userDocs);

    console.log("🎉 Users seeded successfully");
    process.exit();
  } catch (err) {
    console.error("❌ Error seeding users:", err);
    process.exit(1);
  }
}

seedUsers();