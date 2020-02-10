import axios from "axios";

import {
  CREATE_JOB,
  UPDATE_JOB,
  DELETE_JOB,
  GET_JOBS,
  JOBS_LOADING
} from "./types";

// Create Job
export const createJob = jobData => dispatch => {
  axios
    .post("/api/jobs/create", jobData)
    .then(res =>
      dispatch({
        type: CREATE_JOB,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Get jobs by agenda id
export const getJobs = id => dispatch => {
  dispatch(setJobsLoading());
  axios
    .get(`/api/jobs/${id}`)
    .then(res =>
      dispatch({
        type: GET_JOBS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_JOBS,
        payload: null
      })
    );
};

// Delete Job
export const deleteJob = id => dispatch => {
  axios
    .delete(`/api/jobs/delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_JOB,
        payload: id
      })
    )
    .catch(err => console.log(err));
};

// Update Job
export const updateJob = jobData => dispatch => {
  axios
    .patch("/api/jobs/update", jobData)
    .then(res =>
      dispatch({
        type: UPDATE_JOB,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

// Jobs loading
export const setJobsLoading = () => {
  return {
    type: JOBS_LOADING
  };
};
