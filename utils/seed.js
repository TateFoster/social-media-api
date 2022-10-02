const connection = require("../config/connection");
const { Users, Thoughts, Reactions } = require("../models");
const { users, getRandomThoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
	console.log("connected");
	await Thoughts.deleteMany({});
	await Users.deleteMany({});

	const thoughts = getRandomThoughts(20);

	await Users.collection.insertMany(users);
	await Thoughts.collection.insertMany(thoughts);

	const createdThoughts = await Thoughts.find();
	const createdUsers = await Users.find();
	console.log(createdUsers);
	const updateUsers = async () => {
		for (let i = 0; i < createdUsers.length; i++) {
			const sharedName = createdThoughts.filter(
				(createdThoughts) =>
					createdThoughts.username === createdUsers[i].username
			);
			for (let a = 0; a < sharedName.length; a++) {
				console.log(createdUsers[i].username);
				console.log(sharedName[a]._id);
				await Users.findOneAndUpdate(
					{ username: createdUsers[i].username },
					{ $addToSet: { thoughts: sharedName[a]._id } },
					{ new: true }
				);
			}
		}
	};

	const updates = await updateUsers();

	console.table(users);
	console.table(thoughts);
	console.info("Seeding complete! 🌱");
	process.exit(0);
});
