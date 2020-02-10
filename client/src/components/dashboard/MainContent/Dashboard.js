import React, { Component } from "react";
import "./MainContent.scss";
import "./Dashboard.scss";

import { connect } from "react-redux";

import Modal from "./Modal/Modal";

class Dashboard extends Component {
  state = {
    modal: false,
    edit: false,
    name: "",
    members: [],
    id: "",
    owner: {}
  };

  toggleModal = e => {
    this.setState({ modal: !this.state.modal, edit: false });
  };

  toggleEditModal = (name, members, id, owner, e) => {
    e.stopPropagation();

    this.setState({
      modal: !this.state.modal,
      edit: !this.state.edit,
      name: name,
      members: members,
      id: id,
      owner: owner
    });
  };

  render() {
    const { agendas } = this.props.agendas;

    let content;

    let agendaData = agendas.sort().map(agenda => (
      <div
        key={agenda._id}
        className="agenda-icon"
        onClick={() => this.props.history.push(`/agendas/${agenda._id}`)}
      >
        <div className="agenda-name">{agenda.name}</div>
        <div
          className="agenda-info-button"
          onClick={this.toggleEditModal.bind(
            this,
            agenda.name,
            agenda.teamMembers,
            agenda._id,
            agenda.owner
          )}
        >
          Edit agenda
        </div>
        <div className="agenda-info-button">Go to agenda</div>
      </div>
    ));

    if (agendas.length > 0) {
      // At least one agenda
      content = (
        <>
          <button className="main-btn" onClick={this.toggleModal}>
            Create another agenda
          </button>
          <div className="modal-wrapper">
            <Modal
              onClose={this.toggleModal}
              modal={this.state.modal}
              edit={this.state.edit}
              name={this.state.name}
              members={this.state.members}
              id={this.state.id}
              owner={this.state.owner}
            />
          </div>
          <div className="agendas-wrapper">{agendaData}</div>
        </>
      );
    } else {
      // No agendas
      content = (
        <>
          <div className="agendas">
            <div className="no-agendas">
              <h1 className="header">You have no agendas</h1>
              <button className="main-btn" onClick={this.toggleModal}>
                Create your first agenda
              </button>
              <div className="modal-wrapper">
                <Modal onClose={this.toggleModal} modal={this.state.modal} />
              </div>
            </div>
          </div>
        </>
      );
    }

    return (
      <div className="main-content">
        <h1 className="header">Your Agendas</h1>
        {content}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  agendas: state.agendas
});

export default connect(
  mapStateToProps,
  {}
)(Dashboard);
