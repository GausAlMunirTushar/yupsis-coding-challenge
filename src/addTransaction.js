import Message from "./models/Message.js";

const addRandomTransaction = async () => {
	const trxId = Math.floor(Math.random() * 1000);
	const amount = Math.floor(Math.random() * (1000 - 10 + 1)) + 10;

	const newMessage = new Message({
		trxId,
		amount,
		status: "pending",
		attemptCount: 0,
		nextAttemptAt: new Date(),
	});
	await newMessage.save();
	console.log(`New Transaction Added ${trxId}`);
};

export default addRandomTransaction;
