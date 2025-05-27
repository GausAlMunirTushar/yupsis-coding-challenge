import { Schema, model } from "mongoose";

const messageSchema = new Schema(
	{
		trxId: {
			type: Number,
			required: ["Transaction ID Required", true],
		},
		status: {
			type: String,
			enum: ["pending", "success", "rejected"],
			default: "pending",
		},
		attemptCount: {
			type: Number,
			default: 0,
		},
		nextAttemptAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
		versionKey: false,
		timestamps: true,
	}
);

const Message = model("Message", messageSchema);

export default Message;
