import React from 'react';

class TodoContainer extends Component {

  

  render() {
  let { visibleTodos, onClick, onChange} = this.props;
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
            ref = { 'edit_input' }
            class ={ 'list-input' }
            style={
              {
              textDecoration: todo.completed ? 'line-through' : 'none'
              }
            }
            onClick={
              onClick
            } 
            onChange = {
              onChange
            }
            key={ todo.id }
            defaultValue={ todo.text}
      </div>
    )
    }
  </div>

  );
  }
}
