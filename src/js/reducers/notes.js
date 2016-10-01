import { visibilityFilter } from './visibility';

//single version
const note = (state = {}, action ) => {
  switch(action.type) {
    case 'ADD_NOTE':
      return {
        ...action.payload,
      };
    case 'EDIT_NOTE':
      if (state.id === action.payload.id) {
        return {
          ...action.payload
        }
      }
     case 'CHANGE_COLOR_NOTE':
      if (state.id === action.payload.id) {
        return {
          ...state,
          color: action.payload.color
        }
      }
     case 'ARCHIVE_NOTE':
      if (state.id === action.payload.id) {
        return {
          ...state,
          archived: true
        }
      }
    case 'SET_VISIBILITY_FILTER_NOTE':
      if (state.id === action.payload.idList) {
        return {
          ...state,
          visibilityFilter: visibilityFilter(state.visibilityFilter, action)
        }
      }
    default:
      return state;
  }
}

//array version
const listNotes = (state = [], action) => {
  switch (action.type) {
    case 'ADD_LIST_NOTE':
      return [
        ...state,
        note(undefined, action)
      ];
    case 'EDIT_NOTE':
      return state.map(l => listTodo(l, action));
    case 'CHANGE_COLOR_NOTE':
      return state.map(l => listTodo(l, action));
    case 'DELETE_NOTE':
      return state.filter(l => l.id !== action.payload.id);
    case 'ARCHIVE_NOTE':
      return state.map(l => listTodo(l, action));
    case 'SET_VISIBILITY_FILTER_NOTE':
      return state.map(t => listTodo(t, action));
    default:
      return state;
  }
}

export { listNotes };