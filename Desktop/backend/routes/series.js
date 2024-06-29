const express = require("express");
const {
  getSeries,
  newSerie,
  getSerieById,
  updateSerie,
  deleteSerie,
  getCategories,
} = require("../controllers/seriesController");

const router = express.Router();

router.route("/series").get(getSeries);
router.route("/series/new").post(newSerie);
router.route("/series/:id").get(getSerieById).put(updateSerie).delete(deleteSerie);
router.route("/series/categories").get(getCategories);

module.exports = router;
