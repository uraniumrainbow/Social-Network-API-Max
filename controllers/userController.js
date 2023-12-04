const { User } = require("../models");

module.exports = {
  // create user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // get all users
  async getUsers(req, res) {
    try {
      const users = await User.find().select("-__v");

       res.status(200).json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // get one user

  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("thoughts")
        .populate("friends");
      if (!user) {
        return res.status(404).json({ message: "No user with that ID" });
      }
      res.status(200).json(user)
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // update user
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: "No user with this id!" });
      }

      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // delete user
  async deleteUser(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.userId);

      if (!user) {
        return res.status(404).json({ message: "No such user exists" });
      }

      res.json({ message: "User successfully deleted" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // add friend

  async addFriend(req, res) {
    console.log("You are adding a friend");
    console.log(req.body);

    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res
          .status(404)
          .json({ message: "No friend found with that ID :(" });
      }

      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // delete friend
  async removeFriend(req, res) {
    try {
      const friend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends:  req.params.friendId  } },
        { runValidators: true, new: true }
      );

      if (!friend) {
        return res
          .status(404)
          .json({ message: "No friend found with that ID :(" });
      }

      res.json(friend);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};