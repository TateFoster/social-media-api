const { ObjectId } = require("bson");
const { Schema } = require("mongoose");

const reactionSchema = new Schema(
	{
		reactionId: { type: Schema.Types.ObjectId, default: new ObjectId() },
		reactionBody: { type: String, required: true, maxLength: 280 },
		username: { type: String, required: true },
		createdAt: { type: Date, default: Date.now, get: Date.toString() },
	},
	{
		toJSON: {
			getters: true,
		},
		id: false,
	}
);

module.exports = reactionSchema;
