import { visibilityFilter } from './visibility';
const listTodo = (state = {}, action ) => {
  switch(action.type) {
    case 'ADD_LIST_TODO':
      return {
        ...action.payload,
        archived: false,
        creation_date: new Date()
      };    
    case 'EDIT_LIST_TODO':
      console.log(state.id, action.payload.id);
      if (state.id === action.payload.id) {
      return {
        ...state,
        title: action.payload.title,
        modification_date: new Date()
      }
    }
    case 'CHANGE_COLOR_LIST_TODO':
      if (state.id === action.payload.id) {
        return {
          ...state,
          color: action.payload.color
        }
      }
    case 'ARCHIVE_LIST_TODO':
      if (state.id === action.payload.id) {
        return {
          ...state,
          archived: true
        }
      }
    case 'SET_VISIBILITY_FILTER':
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
const listTodos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_LIST_TODO':
      return [
        ...state,
        listTodo(undefined, action)
      ];
    case 'EDIT_LIST_TODO':
      return state.map(l => listTodo(l, action));
    case 'CHANGE_COLOR_LIST_TODO':
      return state.map(l => listTodo(l, action));
    case 'DELETE_LIST_TODO':
      return state.filter(l => l.id !== action.payload.id);
    case 'ARCHIVE_LIST_TODO':
      return state.map(l => listTodo(l, action));
    case 'SET_VISIBILITY_FILTER':
      return state.map(t => listTodo(t, action));
    default:
      return state;
  }
}

export { listTodos };