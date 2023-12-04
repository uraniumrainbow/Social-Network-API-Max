const { User, Thought, Reaction } = require("../models");
const mongoose = require("mongoose");

const connection = require("../config/connection");

// Seed data
const users = [
  {
    username: "Ryan",
    email: "ryan@gmail.com",
    thought: [],
  },
];

const thoughts = [
  {
    username: "Kaladin",
    thoughtText: "Honor is Dead, But I'll see what I can do"
  },
];

console.log(connection);

// Connects to server
connection.once("open", async () => {
  console.log("connected");

  // Drop existing students
  await User.deleteMany({});

  await Thought.deleteMany({})

  // Adds seed data to database
  await User.collection.insertMany(users);

  await Thought.collection.insertMany(thoughts);

  console.table(users);
  console.table(thoughts);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});