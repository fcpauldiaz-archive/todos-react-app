import { createStore, combineReducers } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import deepFreeze from 'deep-freeze';
import expect from 'expect';
import '../styles/index.scss';

import { todos } from './reducers/todos';
import { visibilityFilter } from './reducers/visibility';

const { Component } = React;

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

const store = createStore(todoApp);

const TodoContainer = ({visibleTodos}) => {
  return (
          <div 
          class= {
            'main-container'
          }
          >
          {
            visibleTodos.map(
              (todo, i) => 
              <div 
                class = {
                  'padding-div'
                }
                key= { i }
              >
                <input 
                class ={ 
                  'list-input'
                }
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
    { children }</a>
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
    let {todos, visibilityFilter} = this.props;
    let visibleTodos = getVisibleTodos(todos, visibilityFilter);

    return (
      <div class="main-container">
         <input 
          placeholder={
            'Title'
          }
          class={
            'title-input-none'
          }
          ref="todo_title" 
          />
        <div 
        class= {
          'main-div'
        }
        >
          <input 
            class = {
              'main-input'
            }
            placeholder = { 'Pending todo' }
            onKeyPress={
              (e) => { 
               if (e.key === 'Enter') {
                console.log(this);
                console.log(this.input);
                  store.dispatch({
                    type: 'ADD_TODO',
                    payload: {
                      id: maxId++,
                      text: this.input.value,
                      title: this.refs.todo_title.value
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
              this.refs.button_save.className = '';
            }
           }
          />
          <i class= {
            'glyphicon glyphicon-list cursor'
          }
          onClick= {
            () => { 
              console.log(todo_title.input.value)
            }
          }
          ></i>
          <i class = {
            'glyphicon glyphicon-pencil cursor'
          }
          ></i>
        </div>
        <TodoContainer 
          visibleTodos = { visibleTodos }
          key= { 1 }
          ></TodoContainer>
        <button
          ref={
            'button_save'
          }
          class={
            'button-hidden'
          }
          onClick={
            () => { 
              store.dispatch({
                type: 'SAVE_TODO',
                payload: {
                  id: maxId++,
                  text: this.input.value
                }
              });

              this.input.value = "";
            }
          }
        >Save List of todos</button>
        <div>
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
  ReactDOM.render(
    <TodosApp
      { ...store.getState() }
    />,
    document.getElementById('root')
  );
};

render();
store.subscribe(render);