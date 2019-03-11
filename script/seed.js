"use strict";

const db = require("../server/db");
const { Layer } = require("../server/db/models");
const {
	alphabeticalAvenues,
	diagonals,
	expressways,
	floraStreets,
	generalStreets,
	greatLakeStreets,
	kStreets,
	landmarks,
	lStreets,
	majorStreets,
	mStreets,
	multilevelStreets,
	neighborhoods,
	nStreets,
	numberedStreets,
	oStreets,
	parks,
	pedway,
	presidentialStreets,
	pStreets,
	ranchStreets,
} = require("./../server/db/data/index");

async function seed() {
	await db.sync({
		force: true,
	});
	console.log("db synced!");
	await Layer.create({
		name: "alphabeticalAvenues",
		data: alphabeticalAvenues,
		type: "streets",
	});
	await Layer.create({
		name: "diagonals",
		data: diagonals,
		type: "streets",
	});
	await Layer.create({
		name: "expressways",
		data: expressways,
		type: "streets",
	});
	await Layer.create({
		name: "floraStreets",
		data: floraStreets,
		type: "streets",
	});
	await Layer.create({
		name: "generalStreets",
		data: generalStreets,
		type: "streets",
	});
	await Layer.create({
		name: "greatLakeStreets",
		data: greatLakeStreets,
		type: "streets",
	});
	await Layer.create({
		name: "kStreets",
		data: kStreets,
		type: "streets",
	});
	await Layer.create({
		name: "landmarks",
		data: landmarks,
		type: "boundaries",
	});
	await Layer.create({
		name: "lStreets",
		data: lStreets,
		type: "streets",
	});
	await Layer.create({
		name: "majorStreets",
		data: majorStreets,
		type: "streets",
	});
	await Layer.create({
		name: "mStreets",
		data: mStreets,
		type: "streets",
	});
	await Layer.create({
		name: "multilevelStreets",
		data: multilevelStreets,
		type: "streets",
	});
	await Layer.create({
		name: "neighborhoods",
		data: neighborhoods,
		type: "boundaries",
	});
	await Layer.create({
		name: "nStreets",
		data: nStreets,
		type: "streets",
	});
	await Layer.create({
		name: "numberedStreets",
		data: numberedStreets,
		type: "streets",
	});
	await Layer.create({
		name: "oStreets",
		data: oStreets,
		type: "streets",
	});
	await Layer.create({
		name: "parks",
		data: parks,
		type: "boundaries",
	});
	await Layer.create({
		name: "pedway",
		data: pedway,
		type: "streets",
	});
	await Layer.create({
		name: "presidentialStreets",
		data: presidentialStreets,
		type: "streets",
	});
	await Layer.create({
		name: "pStreets",
		data: pStreets,
		type: "streets",
	});
	await Layer.create({
		name: "ranchStreets",
		data: ranchStreets,
		type: "streets",
	});

	console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
	console.log("seeding...");
	try {
		await seed();
	} catch (err) {
		console.error(err);
		process.exitCode = 1;
	} finally {
		console.log("closing db connection");
		await db.close();
		console.log("db connection closed");
	}
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
	runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
