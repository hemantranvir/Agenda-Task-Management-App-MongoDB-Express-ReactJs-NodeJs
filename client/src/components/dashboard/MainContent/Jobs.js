import React, { Component } from "react";
import "./MainContent.scss";
import { connect } from "react-redux";

import Modal from "./Modal/Modal";

class Jobs extends Component {
  state = {
    modal: false
  };

  toggleModal = e => {
    this.setState({ modal: !this.state.modal });
  };

  render() {
    const { agendas } = this.props.agendas;

    return (
      <div className="main-content">
        <h1 className="header">Your Jobs</h1>
        <div className="agendas">
          <div className="no-agendas">
            <h1 className="header">You have no jobs</h1>
            {agendas.length > 0 ? (
              <p>Visit a agenda to create your first job</p>
            ) : (
              <button className="main-btn" onClick={this.toggleModal}>
                Create your first agenda
              </button>
            )}
            <Modal onClose={this.toggleModal} modal={this.state.modal} />
          </div>
        </div>
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
)(Jobs);
