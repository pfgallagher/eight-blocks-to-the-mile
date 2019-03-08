const router = require("express").Router();
const { Layer } = require("../db/models");
module.exports = router;

router.get("/:layerName", async (req, res, next) => {
	try {
		const layer = await Layer.findOne({
			where: {
				name: req.params.layerName,
			},
		});
		res.json(layer);
	} catch (err) {
		next(err);
	}
});
