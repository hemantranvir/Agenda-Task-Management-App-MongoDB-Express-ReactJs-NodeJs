import {
  CREATE_AGENDA,
  UPDATE_AGENDA,
  DELETE_AGENDA,
  GET_AGENDA,
  AGENDA_LOADING,
  GET_AGENDAS,
  AGENDAS_LOADING
} from "../actions/types";

const initialState = {
  agendas: [],
  agenda: [],
  agendaLoading: false,
  agendasLoading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_AGENDA:
      return {
        ...state,
        agendas: [action.payload, ...state.agendas]
      };
    case UPDATE_AGENDA:
      let index = state.agendas.findIndex(
        agenda => agenda._id === action.payload._id
      );

      state.agendas.splice(index, 1);

      return {
        ...state,
        agendas: [action.payload, ...state.agendas]
      };
    case DELETE_AGENDA:
      return {
        ...state,
        agendas: state.agendas.filter(
          agenda => agenda._id !== action.payload
        )
      };
    case GET_AGENDA:
      return {
        ...state,
        agenda: action.payload,
        agendaLoading: false
      };
    case GET_AGENDAS:
      return {
        ...state,
        agendas: action.payload,
        agendasLoading: false
      };
    case AGENDA_LOADING:
      return {
        ...state,
        agendaLoading: true
      };
    case AGENDAS_LOADING:
      return {
        ...state,
        agendasLoading: true
      };
    default:
      return state;
  }
}
