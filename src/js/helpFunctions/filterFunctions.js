export const getTodosInList = (todos, listTodo) => {
  if (listTodo.length === 0) {
    return todos;
  }
  //let returnValue = listTodo.map((l) => todos.filter(todo => l.todos.indexOf(todo.id) === -1))
  let array = [];
  for (let todos of listTodo) { array = array.concat(todos.todos) }
  let returnValue = todos.filter(t => !array.includes(t.id));
  return returnValue;
}

export const getVisibleTodos = (todos, visibilityFilter) => {
  switch(visibilityFilter) {
    case 'SHOW_ALL': 
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
    default:
      return todos;
  }
}

export const getUnSaved = (todos) => {
  return todos.filter(t => t.saved === false);
}

export const getNewTodos = (todos, listTodo)  => {
  if (typeof listTodo.todos !== 'undefined') {
    return listTodo.todos.map((idList) => todos.filter(v => v.id === idList)[0]).filter(f => f !== undefined);
  }
  return todos;
}

export const getUnArchived = (todos) => {
  return todos.filter (t => t.archived === false);
}

export const getUnArchivedNotes = (notes) => {
  return notes.filter(n => n.archived === false);
}

export const getSearchFilter = (listTodos, search) => {
  
  if (search !== '') {
    
    return listTodos.filter(listTodo => listTodo.title.includes(search));
  }
  return listTodos; 
}
export const getSearchFilterNotes = (listNotes, search) => {
  if (search !== '') {
    return listNotes.filter(note => note.title.includes(search));
  }
  return listNotes;
}