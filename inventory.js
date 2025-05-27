/*
Problem 2: Inventory Management with Multiple Units
- convert to milligrams
*/

const units = {
	tons: 1_000_000_000,
	kilograms: 1_000_000,
	grams: 1_000,
	milligrams: 1,
};

const convertToMilligrams = (stock) => {
	const miligrams = Object.entries(stock).reduce(
		(total, [unit, qty]) => total + qty * units[unit],
		0
	);
	return miligrams;
};

// console.log(convertToMilligrams(units));

const milligramsToUnit = (totalMilligrams) => {
	const resullt = {};
	let remainingMilligrams = totalMilligrams;

	for (const unit of ["tons", "kilograms", "grams", "milligrams"]) {
		resullt[unit] = Math.floor(remainingMilligrams / units[unit]);
		remainingMilligrams %= units[unit];
	}
	return resullt;
};

const updateStock = (currentStock, changeStock, action) => {
	const currentMilligram = convertToMilligrams(currentStock);

	const changeMilligram = convertToMilligrams(changeStock);

	if (action === "sell" && changeMilligram > currentMilligram) {
		console.log(`Empty Stock for sell`);
	}
	const updateMilligram =
		action === "sell"
			? currentMilligram - changeMilligram
			: currentMilligram + changeMilligram;

	return milligramsToUnit(updateMilligram);
};

const initialStock = { tons: 1, kilograms: 0, grams: 0, milligrams: 0 };
console.log(`Intial Stock `, initialStock);

const afterSale = updateStock(
	initialStock,
	{ tons: 0, kilograms: 0, grams: 1, milligrams: 0 },
	"sell"
);
console.log(`After Sale :`, afterSale);

const afterPurchase = updateStock(
	afterSale,
	{ tons: 0, kilograms: 0, grams: 1001, milligrams: 0 },
	"purchase"
);

console.log(`After Purchase:`, afterPurchase);
