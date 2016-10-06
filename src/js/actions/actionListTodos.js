import v4 from 'uuid-v4';

export const editListTodo = (id, title) => ({
  type: 'EDIT_LIST_TODO',
  payload: {
    id, title,
    modification_date: new Date()
  }
});

export const addTodoToList = (newId, text) => ({
  type: 'ADD_TODO_TO_LIST',
  payload: {
    id: newId, 
    text,
    creation_date: new Date()
  }
});

export const addNewTodos = (id, newId) => ({
  type: 'ADD_NEW_TODOS',
  payload: {
    id, 
    newId, 
    modification_date: new Date()
  }
});

export const showColorsTodo = (id) => ({
  type: 'SHOW_COLORS',
  payload: {
    id
  }
});

export const archiveListTodo = (id) => ({
  type: 'TOGGLE_ARCHIVE_LIST_TODO',
  payload: {
    id,
    modification_date: new Date()
  }
});

export const archiveTodo = (id) => ({
  type: 'TOGGLE_ARCHIVE_TODO',
  payload: {
    id,
    modification_date: new Date()
  }
});

export const deleteListTodo = (id) => ({
  type: 'DELETE_LIST_TODO',
  payload: {
    id
  }
});

export const deleteTodos = (id) => ({
  type: 'DELETE_TODO',
  payload: {
    id
  }
});

export const changeColorListTodo = (id, color) => ({
  type: 'CHANGE_COLOR_LIST_TODO',
  payload: {
    id, color, 
    modification_date: new Date()
  }
});

export const setVisibleFilter = (idList, visibilityFilter) => ({
  type: 'SET_VISIBILITY_FILTER',
  payload: {
    idList,
    visibilityFilter
  }
});

export const addListTodo = (title, todos) => ({
  type: 'ADD_LIST_TODO',
  payload: {
    id: v4(),
    title,
    todos,
    creation_date: new Date()
  }
});

export const saveTodos = (id) => ({
  type: 'SAVE_TODO',
  payload: {
    id
  }
})

