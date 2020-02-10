const express = require("express");
const router = express.Router();
const passport = require("passport");

const Job = require("../../models/Job");

// @route GET api/jobs/:id
// @desc Get jobs for specific agenda
// @access Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;

    Job.find({ agenda: id }).then(jobs => res.json(jobs));
  }
);

// @route POST api/jobs/create
// @desc Create a new job
// @access Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const NEW_JOB = new Job({
      agenda: req.body.agenda,
      jobName: req.body.jobName,
      dateDue: req.body.dateDue,
      assignee: req.body.assignee
    });

    NEW_JOB.save()
      .then(job => res.json(job))
      .catch(err => console.log(err));
  }
);

// @route POST api/jobs/delete
// @desc Delete an existing job
// @access Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Job.findById(req.params.id).then(job => {
      job.remove().then(() => res.json({ success: true }));
    });
  }
);

// @route PATCH api/jobs/update
// @desc Update an existing job
// @access Private
router.patch(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let jobFields = {};

    jobFields.jobName = req.body.jobName;
    if (req.body.dateDue && req.body.dateDue !== "Date undefined") {
      jobFields.dateDue = req.body.dateDue;
    }
    jobFields.assignee = req.body.assignee;

    Job.findOneAndUpdate(
      { _id: req.body.id },
      { $set: jobFields },
      { new: true }
    )
      .then(job => {
        res.json(job);
      })
      .catch(err => console.log(err));
  }
);

module.exports = router;
