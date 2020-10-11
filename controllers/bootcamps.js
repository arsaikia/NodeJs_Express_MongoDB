const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
/*
 * @desc     Get All Bootcamps
 * @route    GET /api/v1/bootcamps
 * @access   Public
 */
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.find();

  res
    .status(200)
    .json({ success: true, counts: bootcamps.length, data: bootcamps });
});

/*
 * @desc     Get single Bootcamps
 * @route    GET /api/v1/bootcamps/:id
 * @access   Public
 */
exports.getBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.findById(req.params.id);
  if (!bootcamps) {
    return next(
      new ErrorResponse(`Bootcamp not found with ID of: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: bootcamps });
});

/*
 * @desc     Create a new Bootcamp
 * @route    POST /api/v1/bootcamps
 * @access   Private
 */
exports.createBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({ success: true, data: bootcamp });
});

/*
 * @desc     Update Bootcamp
 * @route    PUT /api/v1/bootcamps/:id
 * @access   Private
 */
exports.updateBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!bootcamps) {
    return next(
      new ErrorResponse(`Bootcamp not found with ID of: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: bootcamp });
});

/*
 * @desc     Delete Bootcamp
 * @route    DELETE /api/v1/bootcamps/:id
 * @access   Private
 */
exports.deleteBootcamp = asyncHandler(async (req, res, next) => {
  const bootcamps = await Bootcamp.findByIdAndDelete(req.params.id);

  if (!bootcamps) {
    return next(
      new ErrorResponse(`Bootcamp not found with ID of: ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
