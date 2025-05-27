import Message from "./models/Message.js";

const retryDelays = [2, 5, 10, 20, 30, 60];

const messageProcessor = async () => {
	try {
		const currentTime = new Date();

		const message = await Message.findOne({
			$or: [
				{ status: "pending" },
				{ status: "rejected", nextAttemptAt: { $lte: currentTime } },
			],
		}).sort({
			createdAt: 1,
		});
		if (!message) {
			console.log(`NO eligible message to process`);
			return;
		}
		const randomNumber = Math.floor(Math.random() * 1000);
		console.log(
			`Processing Transaction ID ${message.trxId} and ${randomNumber} are Same`
		);

		if (message.trxId === randomNumber) {
			message.status = "success";
			message.attemptCount += 1;
			message.nextAttemptAt = null;
			await message.save();

			console.log(`Message ${message._id} sent successfully`);

			netfeeCustomerRecharge(message.trxId);
		} else {
			message.status = "rejected";
			message.attemptCount += 1;

			const delayNumber = Math.min(
				message.attemptCount,
				retryDelays.length - 1
			);

			const delayMinutes = retryDelays[delayNumber];

			message.nextAttemptAt = new Date(
				Date.now() + delayMinutes * 60 * 1000
			);
			await message.save();
			console.log(
				`Message  ${message._id} rejected Retry After  ${delayMinutes} minutes`
			);
		}
	} catch (error) {
		console.log(error);
	}
};

const netfeeCustomerRecharge = () => {
	console.log(`netfeeCustomerRecharge for trxId ${trxId}`);
};

export default messageProcessor;
