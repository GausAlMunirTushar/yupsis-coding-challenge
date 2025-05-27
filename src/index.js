import mongoose from "mongoose";
import addRandomTransaction from "./addTransaction.js";
import messageProcessor from "./messageProcesssor.js";

const start = async () => {
	try {
		await mongoose.connect("mongodb://localhost:27017/yupsis-db");
		console.log("MongoDB Database Connected");

		// Add New Transaction every second
		setInterval(() => {
			addRandomTransaction();
		}, 1000);

		// Process Message
		setInterval(() => {
			messageProcessor();
		}, 2 * 60 * 1000);
	} catch (error) {
		console.log(error);
	}
};

start();
