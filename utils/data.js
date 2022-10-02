const usernamesPartOne = [
	"demon",
	"holy",
	"warrior",
	"corrupted",
	"redeemed",
	"forgotten",
	"rejected",
	"warrior",
	"evil",
	"trapped",
	"saved",
	"lost",
	"dead",
	"reborn",
	"kidnapped",
	"water",
	"fire",
	"earth",
	"wind",
	"magic",
	"musical",
	"zombie",
	"vampire",
	"perfect",
];

const usernamesPartTwo = [
	"Lord",
	"Knight",
	"King",
	"Hero",
	"God",
	"Lover",
	"Queen",
	"Princess",
	"Lady",
	"Saint",
	"Prince",
];

const possibleThoughts = [
	"I am now lord of this land!",
	"My campaign has gone well this year.",
	"Has anyone seen the fabled sword?",
	"You know last week I could have sworn I saw a dragon!",
	"I lost my armor yesterday has anyone seen it?",
	"I am the greatest!",
	"My power shall know no bounds!",
	"The world will soon be in my hands",
];

const possibleReactions = [
	"I shall stop you!",
	"You are right!",
	"I saw something like this yesterday!",
	"Who are you again?",
	"NOOOOOOOOO!",
];

const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomUsername = () =>
	`${getRandomArrItem(usernamesPartOne)}${getRandomArrItem(usernamesPartTwo)}`;

const users = [];

for (let i = 0; i < 10; i++) {
	const username = getRandomUsername();
	const email = `${username}@email.com`;

	users.push({
		username: username,
		email: email,
	});
}

const getRandomThoughts = (int) => {
	let results = [];
	for (let i = 0; i < int; i++) {
		results.push({
			thoughtText: getRandomArrItem(possibleThoughts),
			username: getRandomArrItem(users).username,
			reactions: [...getRandomReactions(2)],
		});
	}
	return results;
};

const getRandomReactions = (int) => {
	let results = [];
	for (let i = 0; i < int; i++) {
		results.push({
			reactionBody: getRandomArrItem(possibleReactions),
			username: getRandomArrItem(users).username,
		});
	}
	return results;
};

module.exports = { users, getRandomThoughts, getRandomReactions };
