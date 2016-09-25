import { createStore, combineReducers } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import deepFreeze from 'deep-freeze';
import expect from 'expect';
import '../styles/index.scss';

import { todos } from './reducers/todos';
import { visibilityFilter } from './reducers/visibility';
import { listTodos } from './reducers/listTodos';

const { Component } = React;

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  listTodos
});

const store = createStore(todoApp);

const TodoContainer = ({visibleTodos}) => {
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
            onClick={
              () => { 
                store.dispatch({
                  type: 'TOGGLE_TODO',
                  payload: {
                    id: todo.id
                  }
                });
              }
            } 
            key={ todo.id }
            value={ todo.text}
        />
      </div>
    )
    }
  </div>

  );
}

const FilterLink = ({visibilityFilter, currentVisibilityFilter,children}) => {
  if (visibilityFilter === currentVisibilityFilter) {
  return <strong> { children } </strong>;
  }

  return <a
    href="#"
    onClick={
      (e) => {
        e.preventDefault();
        store.dispatch({
          type: 'SET_VISIBILITY_FILTER',
          payload: { visibilityFilter }
        });
      }
    }
    >
  { children } </a>
}

const getVisibleTodos = (todos, visibilityFilter) => {
  
  if (visibilityFilter === 'SHOW_ALL') {
    return todos;
  }
  if (visibilityFilter === 'SHOW_COMPLETED') {
    return todos.filter(t => t.completed);
  }
  if (visibilityFilter === 'SHOW_ACTIVE') {
    return todos.filter(t => !t.completed);
  }
}



let maxId = 0;


class TodosApp extends Component {

  render() {

  let { todos, visibilityFilter, listTodos } = this.props;
  let visibleTodos = getVisibleTodos(todos, visibilityFilter);

  return (
    <div class="main-container">
    <div class="search-bar">
      <input type="search" class="search" placeholder="Search..." />
      <a href="#" class="logo" title="GMRUI"></a>
    </div>
    <input 
      placeholder={
        'Title'
      }
      class={ 'title-input-none' }
      ref= { "todo_title" }
    />
    <div 
      class= { 'main-div' }
    >
    <input 
      class = { 'main-input' }
      placeholder = { 'Pending todo' }
      onKeyPress={
        (e) => { 
          if (e.key === 'Enter') {

          store.dispatch({
            type: 'ADD_TODO',
            payload: {
              id: maxId++,
              text: this.input.value,
            }
          });

          this.input.value = "";
          }
        }
      }
       ref={ node => this.input = node } 
       onClick = {
        (e) => {
          this.refs.todo_title.className = 'title-input';
          this.refs.button_save.className = 'btn orange';
          this.refs.text_filter.className = 'margin-none';
        }
       }
      />
      <i 
        class= { 'glyphicon glyphicon-list cursor' }
        onClick= {
          () => { 
          
          }
        }
      ></i>
      <i 
        class = { 'glyphicon glyphicon-pencil cursor' }
      ></i>
    </div>
    <TodoContainer 
      visibleTodos = { visibleTodos }
      key= { 1 }
      ></TodoContainer>
    <button
      ref={ 'button_save' }
      class={ 'button-hidden' }
      onClick={
        () => { 
          store.dispatch({
            type: 'ADD_LIST_TODO',
            payload: {
              id: maxId++,
              title: this.refs.todo_title.value,
              todos: todos
            }
          });
          store.dispatch({
            type: 'DELETE_TODOS'
          });
          this.refs.todo_title.value = "";
          todos = [];
        }
      }
    >Save List of todos</button>
    <div 
      class = { 'margin-top' }
      ref={ 'text_filter' }
    >
    <FilterLink
      visibilityFilter="SHOW_ALL"
      currentVisibilityFilter = { visibilityFilter }
      >ALL</FilterLink>
      {' '}
      <FilterLink
      visibilityFilter="SHOW_COMPLETED"
      currentVisibilityFilter = { visibilityFilter }
      >Completed</FilterLink>
      {' '}
      <FilterLink
      visibilityFilter="SHOW_ACTIVE"
      currentVisibilityFilter = { visibilityFilter }
      >ACTIVE</FilterLink>        
      </div>
    </div>
  );
  }
}



const render = () => {
  console.log(store.getState());
  ReactDOM.render(
    <TodosApp
      { ...store.getState() }
    />,
    document.getElementById('root')
  );
};

render();
store.subscribe(render);