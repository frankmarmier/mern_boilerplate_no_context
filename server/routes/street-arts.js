// server/routes/street-arts.js
const express = require("express");
const router = express.Router();
const StreetArt = require("../models/StreetArt");
const uploader = require("../configs/cloudinary");

/*Get all doc*/
router.get("/", (req, res, next) => {
  StreetArt.find()
    .then((documents) => {
      res.status(200).json(documents);
    })
    .catch((err) => res.status(500).json(err));
});

/*Get one doc*/
router.get("/:streetArtId", (req, res, next) => {
  StreetArt.findById(req.params.streetArtId)
    .then((documents) => {
      res.status(200).json(documents);
    })
    .catch((err) => res.status(500).json(err));
});

/*Post*/
router.post("/", uploader.single("picture"), (req, res, next) => {
  let { lat, lng } = req.body;

  let pictureUrl = req.file.path;

  console.log(req.body);

  const newStreetArt = {
    location: {coordinates : [lat, lng]},
    pictureUrl: pictureUrl
  };

  //concatenation
  console.log(req.body);
  StreetArt.create(newStreetArt)
    .then((documents) => {
      res.status(201).json(documents);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

module.exports = router;
