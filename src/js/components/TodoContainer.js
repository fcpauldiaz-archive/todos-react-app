import React from 'react';

const TodoContainer = ({visibleTodos, onClick}) => {
  return (
    <div 
      class= { 'main-container' }
    >
    {
    visibleTodos.map(
      (todo, i) => 
        <div 
          class = { 'padding-div' }
          key= { i }
          >
          <input 
            class ={ 'list-input' }
            style={
              {
              textDecoration: todo.completed ? 'line-through' : 'none'
              }
            }
            onClick={ onClick } 
            key={ todo.id }
            defaultValue={ todo.text}
        />
      </div>
    )
    }
  </div>

  );
}

export { TodoContainer };