import axios from "axios";

import {
  CREATE_AGENDA,
  UPDATE_AGENDA,
  DELETE_AGENDA,
  GET_AGENDA,
  AGENDA_LOADING,
  GET_AGENDAS,
  AGENDAS_LOADING
} from "./types";

// Create Agenda
export const createAgenda = agendaData => dispatch => {
  axios
    .post("/api/agendas/create", agendaData)
    .then(res =>
      dispatch({
        type: CREATE_AGENDA,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Update Agenda
export const updateAgenda = agendaData => dispatch => {
  axios
    .patch("/api/agendas/update", agendaData)
    .then(res =>
      dispatch({
        type: UPDATE_AGENDA,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Delete Agenda
export const deleteAgenda = (id, history) => dispatch => {
  axios
    .delete(`/api/agendas/delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_AGENDA,
        payload: id
      })
    )
    .then(res => history.push("/dashboard"))
    .catch(err => console.log(err));
};

// Get specific agenda by id
export const getAgenda = id => dispatch => {
  dispatch(setAgendaLoading());
  axios
    .get(`/api/agendas/${id}`)
    .then(res =>
      dispatch({
        type: GET_AGENDA,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_AGENDA,
        payload: null
      })
    );
};

// Get all agendas for specific user
export const getAgendas = () => dispatch => {
  dispatch(setAgendasLoading());
  axios
    .get("/api/agendas")
    .then(res =>
      dispatch({
        type: GET_AGENDAS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_AGENDAS,
        payload: null
      })
    );
};

// Agenda loading
export const setAgendaLoading = () => {
  return {
    type: AGENDA_LOADING
  };
};

// Agendas loading
export const setAgendasLoading = () => {
  return {
    type: AGENDAS_LOADING
  };
};
