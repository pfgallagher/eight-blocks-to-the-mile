const Sequelize = require("sequelize");
const db = require("../db");

const Layer = db.define("layer", {
	name: Sequelize.STRING,
	data: Sequelize.JSON,
	type: Sequelize.ENUM("streets", "boundaries"),
});

module.exports = Layer;
