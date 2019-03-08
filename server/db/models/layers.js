const Sequelize = require("sequelize");
const db = require("../db");

const Layer = db.define("layer", {
	name: Sequelize.STRING,
	data: Sequelize.JSON,
});

module.exports = Layer;
