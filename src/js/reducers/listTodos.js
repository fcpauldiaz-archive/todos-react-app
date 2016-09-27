//single version
const listTodo = (state = {}, action ) => {
  switch(action.type) {
    case 'ADD_LIST_TODO':
      return {
        ...action.payload
      };    
    case 'EDIT_LIST_TODO':
      if (state.id === action.payload.id) {
      return {
        todos: action.payload.todos,
        title: action.payload.text
      }
    }
    case 'CHANGE_COLOR_LIST_TODO':
      if (state.id === action.payload.id) {
        return {
          ...state,
          color: action.payload.color
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
    case 'DELTE_LIST_TODO':
      return state.filter(l => l.id !== action.payload.id);
    default:
      return state;
  }
}

export { listTodos };