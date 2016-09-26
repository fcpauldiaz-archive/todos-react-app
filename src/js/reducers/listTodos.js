//single version
const listTodo = (state = {}, action ) => {
  switch(action.type) {
    case 'ADD_LIST_TODO':
      return {
        ...action.payload
      };    
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
    default:
      return state;
  }
}

export { listTodos };