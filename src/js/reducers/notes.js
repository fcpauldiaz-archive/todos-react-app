//single version
const note = (state = {}, action ) => {
  switch(action.type) {
    case 'ADD_LIST_NOTE':
      return {
        ...action.payload,
      };
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
    default:
      return state;
  }
}

export { listNotes };