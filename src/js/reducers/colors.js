const colors = (state = false, action) => {
  switch(action.type){
    case 'SHOW_COLORS':
      return !state;
    case 'SHOW_COLOR_NOTE':
      return !state;
    default:
      return state;
  }
}

export { colors };