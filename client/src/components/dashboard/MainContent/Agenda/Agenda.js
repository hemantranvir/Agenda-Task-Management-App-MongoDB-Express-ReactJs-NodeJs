import React, { Component } from "react";
import { connect } from "react-redux";
import { getAgenda } from "../../../../actions/agendasActions";
import { getJobs, deleteJob } from "../../../../actions/jobActions";

import Spinner from "../../../common/Spinner";
import Modal from "../Modal/Modal";

import "../MainContent.scss";
import "./Agenda.scss";

class Agenda extends Component {
  state = {
    modal: false,
    edit: false,
    editJob: false,
    job: false,
    name: "",
    members: [],
    id: "",
    owner: {},
    jobs: [],
    date: "",
    jobName: "",
    assignee: "",
    jobId: "",
    dateDue: ""
  };

  toggleModal = e => {
    this.setState({
      modal: !this.state.modal,
      edit: false,
      job: false,
      editJob: false
    });
  };

  toggleEditModal = (name, members, id, owner, e) => {
    this.setState({
      modal: !this.state.modal,
      edit: !this.state.edit,
      name: name,
      members: members,
      id: id,
      owner: owner
    });
  };

  toggleJobModal = e => {
    this.setState({
      modal: !this.state.modal,
      job: !this.state.job
    });
  };

  toggleEditJobModal = (jobName, assignee, dateDue, id, e) => {
    this.setState({
      modal: !this.state.modal,
      editJob: !this.state.editJob,
      jobName: jobName,
      assignee: assignee,
      jobId: id,
      dateDue: dateDue
    });
  };

  componentDidMount() {
    this.props.getAgenda(this.props.match.params.agenda);
    this.props.getJobs(this.props.match.params.agenda);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.agenda !== prevProps.match.params.agenda) {
      this.props.getAgenda(this.props.match.params.agenda);
      this.props.getJobs(this.props.match.params.agenda);
    }
  }

  onChange = async e => {
    await this.setState({ jobs: this.props.jobs.jobs });

    let jobs = await [...this.state.jobs];

    jobs[e.target.id].jobName = await e.target.value;

    await this.setState({ jobs });
  };

  deleteJob = id => {
    this.props.deleteJob(id);
  };

  render() {
    const { jobs } = this.props.jobs;

    let jobsList = jobs.map((job, index) => (
      <div className="job-input" key={job._id}>
        <i
          className="material-icons check-job"
          onClick={this.deleteJob.bind(this, job._id)}
        >
          check_circle
        </i>
        <span
          onClick={this.toggleEditJobModal.bind(
            this,
            job.jobName,
            job.assignee,
            job.dateDue,
            job._id
          )}
          id={index}
          name="job"
          className="agenda-job"
        >
          {job.jobName}
        </span>
        <span
          onClick={this.toggleEditJobModal.bind(
            this,
            job.jobName,
            job.assignee,
            job.dateDue,
            job._id
          )}
          className={!job.assignee ? "job-info muted" : "job-info"}
        >
          {job.assignee === this.props.auth.user.email
            ? "You"
            : job.assignee || "Unassigned"}
        </span>
        <span
          onClick={this.toggleEditJobModal.bind(
            this,
            job.jobName,
            job.assignee,
            job.dateDue,
            job._id
          )}
          className={
            job.dateDue === "Date undefined" ? "job-info muted" : "job-info"
          }
        >
          {job.dateDue === "Date undefined" ? "Not Set" : job.dateDue}
        </span>
      </div>
    ));

    if (
      this.props.agenda &&
      this.props.agenda.teamMembers &&
      !this.props.agendas.agendaLoading &&
      !this.props.jobs.jobsLoading
    ) {
      const { agenda } = this.props;

      return (
        <div className="main-content">
          <h1 className="agenda-header">{agenda.name}</h1>
          <button
            onClick={this.toggleEditModal.bind(
              this,
              agenda.name,
              agenda.teamMembers,
              agenda._id,
              agenda.owner
            )}
            className="main-btn center-btn"
          >
            Edit Agenda Info
          </button>

          <div className="modal-wrapper">
            <Modal
              onClose={this.toggleModal}
              modal={this.state.modal}
              edit={this.state.edit}
              job={this.state.job}
              editJob={this.state.editJob}
              name={this.state.name}
              members={this.state.members}
              id={this.state.id}
              owner={this.state.owner}
              jobName={this.state.jobName}
              assignee={this.state.assignee}
              dateDue={this.state.dateDue}
              jobId={this.state.jobId}
            />
          </div>
          <div className="jobs-container">
            <div className="agendas-first-row">
              <button
                className="main-btn add-btn"
                onClick={this.toggleJobModal}
              >
                Add job
              </button>
              <div className="agendas-column-headers">
                <p>Assignee</p>
                <p>Due</p>
              </div>
            </div>
            <div className="agenda-jobs">{jobsList}</div>
          </div>
        </div>
      );
    }

    return (
      <div className="agenda-spinner">
        <Spinner />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  agenda: state.agendas.agenda,
  agendas: state.agendas,
  jobs: state.jobs
});

export default connect(
  mapStateToProps,
  { getAgenda, getJobs, deleteJob }
)(Agenda);
