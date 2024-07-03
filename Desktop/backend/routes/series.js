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
router.route("/series/:id").get(getSerieById);
router.route("/series/update/:id").put(updateSerie);
router.route("/series/delete/:id").delete(deleteSerie);
router.route("/series/categories").get(getCategories);

module.exports = router;
