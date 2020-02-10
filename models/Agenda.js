const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AgendaSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  owner: {
    type: Object,
    required: true
  },
  teamMembers: [
    {
      email: {
        type: String
      },
      name: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Agenda = mongoose.model("agendas", AgendaSchema);
