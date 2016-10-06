import React from 'react';
const { Component } = React;
import {
  toggleTodo, editTodo,
  deleteTodo, addTodo,
} from './../actions/actionTodos';

import { FilterButtons } from './../components/FilterButtons';
import { getVisibleTodos, getUnSaved, getNewTodos } from './../helpFunctions/filterFunctions';


class TodoContainer extends Component {

  render() {
  let { todos, listTodo, visibilityFilter, dispatch } = this.props;
  let visibleTodos = getVisibleTodos(getNewTodos(todos, listTodo), visibilityFilter);
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
         <button
          class= { 'btn orange' }
          onClick={
            () => { 
              dispatch(toggleTodo(todo.id));
            }
          } 
        >
        <i
          class = {  todo.completed ? 'glyphicon glyphicon-ok' : 'glyphicon glyphicon-unchecked' }
        ></i>
        </button>
          <input 

            class ={ 'list-input' }
            style={
              {
              textDecoration: todo.completed ? 'line-through' : 'none'
              }
            }
            onChange = {
              (e) => {
                dispatch(editTodo(todo.id, e.target.value));
              }
            }
            key={ todo.id }
            defaultValue={ todo.text}
        />
        <button
          class= { 'btn red' }
          onClick={
            () => { 
              dispatch(deleteTodo(todo.id));
            }
          } 
        >
        <i
          class = {   'glyphicon glyphicon-remove'  }
        ></i>
        </button>
      </div>
    )
    }
  </div>

  );
  }
}

export { TodoContainer }