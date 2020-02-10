import {
  CREATE_JOB,
  UPDATE_JOB,
  DELETE_JOB,
  GET_JOBS,
  JOBS_LOADING
} from "../actions/types";

const initialState = {
  jobs: [],
  jobsLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_JOB:
      return {
        ...state,
        jobs: [action.payload, ...state.jobs]
      };
    case GET_JOBS:
      return {
        ...state,
        jobs: action.payload,
        jobsLoading: false
      };
    case UPDATE_JOB:
      let index = state.jobs.findIndex(
        job => job._id === action.payload._id
      );

      state.jobs.splice(index, 1);

      return {
        ...state,
        jobs: [action.payload, ...state.jobs]
      };
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter(job => job._id !== action.payload)
      };
    case JOBS_LOADING:
      return {
        ...state,
        jobsLoading: true
      };
    default:
      return state;
  }
}
