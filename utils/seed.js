const connection = require("../config/connection");
const { Users, Thoughts, Reactions } = require("../models");
const { users, getRandomThoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
	console.log("connected");
	await Thoughts.deleteMany({});
	await Users.deleteMany({});

	const thoughts = getRandomThoughts(20);

	await Thoughts.collection.insertMany(thoughts);
	await Users.collection.insertMany(users);

	const createdThoughts = await Thoughts.find();
	console.log(createdThoughts);
	const updateUsers = () => {
		for (let i = 0; i < createdThoughts.length; i++) {
			if (createdThoughts[i].username === users.username) {
				Users.findOneAndUpdate(
					{ username: createdThoughts[i].username },
					{ $addToSet: { thoughts: createdThoughts[i]._id } },
					{ new: true }
				);
			}
			return;
		}
	};

	updateUsers();
	console.table(users);
	console.table(thoughts);
	console.info("Seeding complete! 🌱");
	process.exit(0);
});
