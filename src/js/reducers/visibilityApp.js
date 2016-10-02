const visibilityApp = (state = {
      app: 'SHOW_TODOS',
      search: ''
    }, action) => {
  switch(action.type){
    case 'SET_VISIBILITY_FILTER_APP':
      return {  
        ...state,
        app: action.payload.app
      };
    case 'SET_SEARCH_FILTER':
      return {
        ...state,
        search: action.payload.search
      }
    default:
      return state;
  }
}

export { visibilityApp };