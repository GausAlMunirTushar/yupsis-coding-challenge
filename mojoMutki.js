/*
Problem 1: Mojo and Mutki Exchange Calculation
*/

const calculateTotalMojos = (initialMojos = 10) => {
	let totalEaten = initialMojos;
	let mutkis = initialMojos;

	while (mutkis >= 3) {
		const newMojos = Math.floor(mutkis / 3);
		totalEaten += newMojos;
		mutkis = (mutkis % 3) + newMojos;
	}
	return totalEaten;
};
const totalEaten = calculateTotalMojos(7);

console.log(`Total = ${totalEaten} Mojos consumed`);
