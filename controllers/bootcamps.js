const Bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder  = require('../utils/geocoder');


/*
 * @desc     Get All Bootcamps
 * @route    GET /api/v1/bootcamps
 * @access   Public
 */
exports.getBootcamps = asyncHandler(async (req, res, next) => {
  let query;

  // Copy req.query
  const reqQuery = {...req.query};

  // Fields to exclude
  const removeFields = ['select', 'sort'];

  // loop over removeFields and delete them from request query
  removeFields.forEach( param => delete reqQuery[param]);

  console.log(reqQuery);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);


  // Create operatrs like gt, gte etc
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resources
  query = Bootcamp.find(JSON.parse(queryStr));

  // SELECT Fields
  if(req.query.select){
    const fields = req.query.select.split(',').join(" ");
    query = query.select(fields);
  }

  // Sort
  if(req.query.sort){
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  }else{
    query = query.sort('-createdAt');
  }

  // Execute the query
  const bootcamps = await query;

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
 * @desc     Get All Bootcamps within radius
 * @route    GET /api/v1/bootcamps/:zipcode/:distance
 * @access   Public
 */
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
  const {zipcode, distance} = req.params;

  // Get latitute and longitue from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calc radius using radians
  // Divide distance by radius of earth
  // Radius of Earth = 3963 mi <=> 6378 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({location: {$geoWithin: { $centerSphere : [ [ lng, lat ], radius]}}})

  res.status(200).json({success: true, count: bootcamps.length, data: bootcamps})
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
