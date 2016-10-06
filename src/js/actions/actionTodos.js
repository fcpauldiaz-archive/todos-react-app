import v4 from 'uuid-v4';

export const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  payload: { 
    id,
    modification_date: new Date()
  }
});

export const editTodo = (id, text) => ({
  type: 'EDIT_TODO',
  payload: {
    id, text,
    modification_date: new Date()
  }
});

export const deleteTodo = (id) => ({
  type: 'DELETE_TODO',
  payload: {
    id
  }
});

export const addTodo = (text) => ({
  type: 'ADD_TODO',
  payload: {
    id: v4(),
    text,
    creation_date: new Date()
  }
})


