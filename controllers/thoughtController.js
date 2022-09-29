const { Thoughts, Users } = require("../models");

module.exports = {
	getThoughts(req, res) {
		Thoughts.find()
			.then((thoughts) => res.json(thoughts))
			.catch((err) => res.status(500).json(err));
	},
	createThought(req, res) {
		Thoughts.create(req.body)
			.then((thought) => {
				return Users.findOneAndUpdate(
					{ username: req.body.username },
					{ $addToSet: { thoughts: thought._id } },
					{ new: true }
				);
			})
			.then((user) =>
				!user
					? res.status(404).json({
							message: "Thought created, but no user with that username",
					  })
					: res.json("Thought created")
			)
			.catch((err) => {
				res.status(500).json(err);
			});
	},
	getOneThought(req, res) {
		Thoughts.findOne({ _id: req.params.thoughtId })
			.then((thought) =>
				!thought
					? res.status(404).json({ message: "No thought with this ID" })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
	updateThought(req, res) {
		Thoughts.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $set: req.body },
			{ runValidators: true, new: true }
		)
			.then((thought) =>
				!thought
					? res.status(404).json({ message: "No thought with this ID" })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
	deleteThought(req, res) {
		Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
			.then((thought) =>
				!thought
					? res.status(404).json({ message: "No thought with this ID" })
					: Users.findOneAndUpdate(
							{
								thoughts: req.params.thoughtId,
							},
							{ $pull: { thoughts: req.params.thoughtId } },
							{ new: true }
					  )
			)
			.then((user) =>
				!user
					? res.status(404).json({
							message: "Thought deleted but no user with this thought",
					  })
					: res.json({ message: "Thought deleted!" })
			);
	},
	addReaction(req, res) {
		Thoughts.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $addToSet: { reactions: req.body } },
			{ runValidators: true, new: true }
		)
			.then((thought) =>
				!thought
					? res.status(404).json({ message: "No thought with this ID" })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
	removeReaction(req, res) {
		Thoughts.findOneAndUpdate(
			{
				_id: req.params.thoughtId,
			},
			{ $pull: { reactions: { reactionId: req.params.reactionId } } },
			{ runValidators: true, new: true }
		)
			.then((thought) =>
				!thought
					? res.status(404).json({ message: "No thought with this ID" })
					: res.json(thought)
			)
			.catch((err) => res.status(500).json(err));
	},
};
