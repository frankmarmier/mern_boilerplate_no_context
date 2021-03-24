const express = require("express");
const StreetArt = require("../models/StreetArt");
const Visit = require("../models/Visit");
const isLoggedIn = require("../middlewares/isLoggedIn");
const { VirtualType } = require("mongoose");
const router = express.Router();

router.get("/my-visits", isLoggedIn, (req, res, next) => {
  console.log(req.session.currentUser);
  console.log(req.params.id);

  // const {_user} = req.session.currentUser._id
  // { _user: {eq: ${req.session.currentUser._id}} }

  Visit.find({ _user: req.session.currentUser._id })
    .populate("_streetArt")
    .then((visits) => {
      res.status(200).json(result);
    })
    .catch((err) => next(err));
});

router.post("/visits", isLoggedIn, (req, res, next) => {
  let newVisit = { _user: req.session.currentUser._id, ...req.body };

  Visit.create(newVisit)
    .then((visit) => {
      res.status(201).json(visit);
    })
    .catch((err) => res.status(500).json(err));
});

router.delete("/visits/:visitId", isLoggedIn, async (req, res, next) => {
  const visitId = req.params.visitId;
  const visitToDelete = await (await Visit.findById(visitId)).populated(
    "_user"
  );

  const visitOwnerId = visitToDelete._user._id;
  const visitIdUser = req.session.currentUser._id;

  if (visitOwnerId.toString() === visitIdUser.toString()) {
    const deletedVisit = await Visit.findByIdAndDelete(req.params.id)
      .then((visit) => {
        res.status(201).json("Visit successfully deleted");
      })
      .catch((err) => res.status(500).json(err));
  }
});

module.exports = router;
