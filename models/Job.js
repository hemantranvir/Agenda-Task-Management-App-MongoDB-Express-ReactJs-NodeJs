const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const JobSchema = new Schema({
  agenda: {
    type: Schema.Types.ObjectId,
    ref: "agendas",
    required: true
  },
  jobName: {
    type: String,
    required: true
  },
  dateDue: {
    type: String
  },
  assignee: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

module.exports = Job = mongoose.model("jobs", JobSchema);
