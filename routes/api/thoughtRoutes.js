const router = require("express").Router();
const {
	getThoughts,
	createThought,
	getOneThought,
	updateThought,
	deleteThought,
	addReaction,
	deleteReaction,
} = require("../../controllers/thoughtController");

router.route("/").get(getThoughts).post(createThought);

router
	.route("/:thoughtId")
	.get(getOneThought)
	.put(updateThought)
	.delete(deleteThought);

router.route("/:thoughtId/reactions").post(addReaction).delete(deleteReaction);

module.exports = router;
