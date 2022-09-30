const { ObjectId } = require("bson");
const { Schema } = require("mongoose");

const reactionSchema = new Schema(
	{
		reactionId: { type: Schema.Types.ObjectId, default: new ObjectId() },
		reactionBody: { type: String, required: true, maxLength: 280 },
		username: { type: String, required: true },
		createdAt: { type: Date, default: Date.now, get: dateString },
	},
	{
		toJSON: {
			getters: true,
		},
		id: false,
	}
);

function dateString(date) {
	return date.toString();
}

module.exports = reactionSchema;
