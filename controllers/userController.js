const { Users, Thoughts } = require("../models");

module.exports = {
	async getUsers(req, res) {
		try {
			const allUsers = await Users.find();
			return res.json(allUsers);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	async createUser(req, res) {
		try {
			const newUser = await Users.create(req.body);
			return res.json(newUser);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	async getOneUser(req, res) {
		try {
			const oneUser = await Users.findOne({ _id: req.params.userId });

			if (!oneUser) {
				return res.status(404).json({ message: "No user with this ID" });
			}
			return res.json(oneUser);
		} catch (err) {
			res.status(500).json(err);
		}
	},
	updateUser(req, res) {
		Users.findOneAndUpdate(
			{
				_id: req.params.userId,
			},
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.then((user) =>
				!user
					? res.status(404).json({ message: "No user with this ID" })
					: res.json(user)
			)
			.catch((err) => {
				res.status(500).json(err);
			});
	},
	deleteUser(req, res) {
		Users.findOneAndDelete({ _id: req.params.userId })
			.then((user) =>
				!user
					? res.status(404).json({ message: "No user with this ID" })
					: Thoughts.deleteMany({ _id: { $in: user.thoughts } })
							.then(() =>
								res.json({ message: "User and associated thoughts deleted." })
							)
							.catch((err) => res.status(500).json(err))
			)
			.catch((err) => res.status(500).json(err));
	},
	addFriend(req, res) {
		Users.findOneAndUpdate(
			{
				_id: req.params.friendId,
			},
			{
				$addToSet: { friends: req.params.userId },
			},
			{ runValidators: true, new: true }
		)
			.then(() =>
				Users.findOneAndUpdate(
					{
						_id: req.params.userId,
					},
					{
						$addToSet: { friends: req.params.friendId },
					},
					{ runValidators: true, new: true }
				)
			)
			.then((user) =>
				!user
					? res.status(404).json({ message: "No user with this ID" })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
	removeFriend(req, res) {
		Users.findOneAndUpdate(
			{
				_id: req.params.friendId,
			},
			{
				$pull: { friends: req.params.userId },
			},
			{ runValidators: true, new: true }
		)
			.then(() =>
				Users.findOneAndUpdate(
					{
						_id: req.params.userId,
					},
					{
						$pull: { friends: req.params.friendId },
					},
					{ runValidators: true, new: true }
				)
			)
			.then((user) =>
				!user
					? res.status(404).json({ message: "No user with this ID" })
					: res.json(user)
			)
			.catch((err) => res.status(500).json(err));
	},
};
