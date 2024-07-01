const Serie = require("../models/series");
const ErrorHandler = require("../util/errorHandler");

// Get all Series => /api/v1/series
exports.getSeries = async (req, res, next) => {
  try {
    let query = Serie.find();

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort({ created: -1 });
    }

    if (req.query.category) {
      query = query.where("category").equals(req.query.category);
    }

    const series = await query.exec();

    res.status(200).json({
      success: true,
      message: series.length,
      data: series,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch series",
    });
  }
};

// New Serie => /api/v1/series/new
exports.newSerie = async (req, res, next) => {
  try {
    const serie = await Serie.create(req.body);

    res.status(201).json({
      success: true,
      message: "Serie Created",
      data: serie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to create series",
    });
  }
};

// Get a single Serie by ID => /api/v1/series/:id
exports.getSerieById = async (req, res, next) => {
  try {
    const serie = await Serie.findById(req.params.id);

    if (!serie) {
      return res.status(404).json({
        success: false,
        message: "Serie not found",
      });
    }

    res.status(200).json({
      success: true,
      data: serie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch series",
    });
  }
};

// Update a Serie => /api/v1/series/:id
exports.updateSerie = async (req, res, next) => {
  try {
    let serie = await Serie.findById(req.params.id);

    if (!serie) {
      return next(new ErrorHandler("Serie not found", 404));
    }

    serie = await Serie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      message: "Serie is updated",
      data: serie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to update series",
    });
  }
};

// Delete Serie => /api/v1/series/:id
exports.deleteSerie = async (req, res, next) => {
  try {
    let serie = await Serie.findById(req.params.id);

    if (!serie) {
      return res.status(404).json({
        success: false,
        message: "Serie not found",
      });
    }

    await Serie.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Serie is deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to delete series",
    });
  }
};

// Get distinct categories => /api/v1/series/categories
exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Serie.distinct("category");
    res.status(200).json({
      success: true,
      size: categories.length,
      data: categories,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Failed to fetch categories",
    });
  }
};
