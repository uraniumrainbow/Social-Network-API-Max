const { Thought, User } = require("../models");

module.exports = {
  // create user
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);

      const updatedUser = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      res.json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // get all users
  async getThoughts(req, res) {
    try {
      const users = await Thought.find();

      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // get one user

  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId });
      if (!thought) {
        return res.status(404).json({ message: "No thought with that ID" });
      }
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // update user
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thought);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // delete user
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        return res.status(404).json({ message: "No such thought exists" });
      }

      res.json({ message: "Thought successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // add friend

  async addReaction(req, res) {
    console.log("You are adding a reaction");
    console.log(req.body);

    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.reactionId },
        { $addToSet: { friends: req.body } },
        { runValidators: true, new: true }
      );

      if (!reaction) {
        return res
          .status(404)
          .json({ message: "No reaction found with that ID :(" });
      }

      res.json(reaction);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  

  async removeReaction(req, res) {
    try {
      const reaction = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { thought: req.params.reactionId } },
        { new: true }
      );

      res.json(reaction);
    } catch (error) {}
  },
};