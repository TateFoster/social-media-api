const { Schema, model } = require("mongoose");
const Reactions = require("./Reactions");

const thoughtSchema = new Schema(
	{
		thoughtText: { type: String, required: true, minLength: 1, maxLength: 280 },
		createdAt: { type: Date, default: Date.now, get: {} },
		username: { type: String, required: true },
		reactions: [Reactions],
	},
	{
		toJSON: {
			virtuals: true,
		},
	}
);

thoughtSchema.virtual("reactionCount").get(function () {
	return this.reactions.length;
});

const Thoughts = model("thought", thoughtSchema);

module.exports = Thoughts;
