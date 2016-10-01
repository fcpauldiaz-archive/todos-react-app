const visibilityFilter = (state = 'SHOW_ALL', action) => {
  console.log('re', state)
  switch(action.type){
    case 'SET_VISIBILITY_FILTER':
      return action.payload.visibilityFilter;
    default:
      return state;
  }
}

export { visibilityFilter };