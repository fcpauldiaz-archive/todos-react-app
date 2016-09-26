const todo = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        ...action.payload,
        completed: false
      };
    case 'TOGGLE_TODO':
      if(state.id === action.payload.id){
        return {
          ...state,
          completed: !state.completed
        };
      }
    case 'EDIT_TODO':
      if (state.id === action.payload.id){
        return {
          ...state,
          text: action.payload.text
        }
      }

    default:
      return state;
  }
}

const todos = (state = [], action) => {
  switch (action.type){
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ];

    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));

    case 'EDIT_TODO':
      return state.map(t => todo(t, action));
      
    case 'DELETE_TODOS':
      return [];
    default:
      return state;
  }
}

export { todos };