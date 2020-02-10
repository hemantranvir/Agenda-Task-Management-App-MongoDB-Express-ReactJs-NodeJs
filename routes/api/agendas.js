const express = require("express");
const router = express.Router();
const passport = require("passport");

const Agenda = require("../../models/Agenda");

// @route GET api/agendas
// @desc Get all agendas for a specific user
// @access Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    //console.log("cookies are: ", req.cookies['jwt'])
    //console.log("cookies are: ", req.cookies.jwt)
    let agendasArr = [];

    // Member agendas
    await Agenda.find({})
      .then(agendas => {
        agendas.map(agenda => {
          agenda.teamMembers &&
            agenda.teamMembers.map(member => {
              if (member.email == req.user.email) {
                agendasArr.push(agenda);
              }
            });
        });
      })
      .catch(err => console.log(err));

    const OWNER = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };

    // Combine with owner agendas
    await Agenda.find({ owner: OWNER })
      .then(agendas => {
        let finalArr = [...agendas, ...agendasArr];
        res.json(finalArr);
      })
      .catch(err => console.log(err));
  }
);

// @route GET api/agendas/:id
// @desc Get specific agenda by id
// @access Private
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let id = req.params.id;

    Agenda.findById(id).then(agenda => res.json(agenda));
  }
);

// @route POST api/agendas/create
// @desc Create a new agenda
// @access Private
router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const OWNER = {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    };

    const NEW_AGENDA = await new Agenda({
      owner: OWNER,
      name: req.body.agendaName,
      teamMembers: req.body.members
    });

    NEW_AGENDA.save().then(agenda => res.json(agenda));
  }
);

// @route PATCH api/agendas/update
// @desc Update an existing agenda
// @access Private
router.patch(
  "/update",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    let agendaFields = {};

    agendaFields.name = req.body.agendaName;
    agendaFields.teamMembers = req.body.members;

    Agenda.findOneAndUpdate(
      { _id: req.body.id },
      { $set: agendaFields },
      { new: true }
    )
      .then(agenda => {
        res.json(agenda);
      })
      .catch(err => console.log(err));
  }
);

// @route DELETE api/agendas/delete/:id
// @desc Delete an existing agenda
// @access Private
router.delete(
  "/delete/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Agenda.findById(req.params.id).then(agenda => {
      agenda.remove().then(() => res.json({ success: true }));
    });
  }
);

module.exports = router;
