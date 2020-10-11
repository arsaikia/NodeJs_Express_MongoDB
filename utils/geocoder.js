const nodeGeocoder = require("node-geocoder");

const options = {
  provider: process.env.GEOCODER_PROVIDER,
  httpadapter: "https",
  apikey: process.env.GEOCODER_API_KEY,
  formatter: null,
};
