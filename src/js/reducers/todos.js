const todo = (state = {}, action) => {
  switch(action.type) {
    case 'ADD_TODO':
      return {
        ...action.payload,
        completed: false,
        saved: false,
        archived: false
      };
    case 'ADD_TODO_TO_LIST':
      return {
        ...action.payload,
        completed: false,
        saved: true,
        archived: false
      };
    case 'TOGGLE_TODO':
      if(state.id === action.payload.id){
        return {
          ...state,
          completed: !state.completed,
          modification_date: action.payload.modification_date
        };
      }
    case 'SAVE_TODO':
      if (state.id === action.payload.id) {
        return {
          ...state,
          saved: true,
          modification_date: action.payload.modification_date
        }
      }
    case 'EDIT_TODO':
      if (state.id === action.payload.id){
        console.log(action.payload.text)
        return {
          ...state,
          text: action.payload.text,
          modification_date: action.payload.modification_date
        }
      }
    case 'TOGGLE_ARCHIVE_TODO':
      if (state.id === action.payload.id) {
        return {
          ...state,
          archived: true,
          modification_date: action.payload.modification_date
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
    case 'ADD_TODO_TO_LIST': {
      return [
        ...state,
        todo(undefined, action)
      ];
    }
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    case 'SAVE_TODO':
      return state.map(t => todo(t, action));
    case 'EDIT_TODO':
      return state.map(t => todo(t, action));
    case 'DELETE_TODO':
      return state.filter(t => t.id !== action.payload.id);
    case 'TOGGLE_ARCHIVE_TODO':
      return state.map(t => todo(t,action));
    default:
      return state;
  }
}

export { todos };