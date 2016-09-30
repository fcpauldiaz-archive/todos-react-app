import { createStore, combineReducers } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import deepFreeze from 'deep-freeze';
import expect from 'expect';
import '../styles/index.scss';

import { todos } from './reducers/todos';
import { colors } from './containers/colors';
import { visibilityFilter } from './reducers/visibility';
import { listTodos } from './reducers/listTodos';
import { listNotes } from './reducers/notes';

const { Component } = React;

const todoApp = combineReducers({
  todos,
  visibilityFilter,
  listTodos,
  listNotes
});

const store = createStore(todoApp);

class SavedTodoListContainer extends Component {
  render() {
    let { listTodos, visibleTodos } = this.props;
    if (typeof listTodos === 'undefined') {
      listTodos = [];
    }
    console.log('test');  
    console.log(listTodos);
    return (
        <div>
        {
          listTodos.map((list, i) =>
             <div 
              ref = { 'color_list' }
              class= { 'list-container' }
              style = {
                {
                  backgroundColor: list.color
                }
              }
              key = { i }
            >
              <input 
                defaultValue = { list.title }
                class={ 'title-input' }
                ref= { "todo_title" }
              />
              <TodoContainer 
                visibleTodos = { getNewTodos(visibleTodos, list.id) }
                key= { 1 }
              ></TodoContainer>
              <div 
                class= { 'edit-div' }
              >
                <i 
                  class = { 'glyphicon glyphicon-pencil cursor-edit' }
                  onClick = { 
                    () => {

                      if (this.refs.color.className == 'hide-element') {
                        this.refs.color.className = 'circle-container'
                      }
                      else {
                        this.refs.color.className = 'hide-element'
                      }
                      }
                    }
                ></i>
                <div 
                  ref = { 'color' }
                  class = {
                    'hide-element'
                  }
                  >
                 <ColorContainer
                   refs = { this.refs }
                   listTodo = { list }
                 >
                 </ColorContainer>
                 </div>
                 <button
                  ref={ 'button_save' }
                  class={ 'btn orange size' }
                  onClick={
                    () => { 
                      store.dispatch({
                        type: 'EDIT_LIST_TODO',
                        payload: {
                          id: list.id,
                          title: this.refs.todo_title.value,
                          todos: list.todos
                        }
                      });
                    }
                  }
                >Update</button>
                <button
                  class={ 'btn blue size' }
                  onClick={
                    () => { 
                      store.dispatch({
                        type: 'ARCHIVE_LIST_TODO',
                        payload: {
                          id: list.id
                        }
                      });
                    }
                  }
                >Archive </button>
                <button
                  class={ 'btn red size' }
                  onClick={
                    () => { 
                      store.dispatch({
                        type: 'DELETE_LIST_TODO',
                        payload: {
                          id: list.id
                        }
                      });
                    }
                  }
                >Delete </button>
                
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
              </div>
             
          )
        }
        </div>
      );
  }
}


class TodoContainer extends Component {

  render() {
  let {visibleTodos} = this.props;

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
              store.dispatch({
                type: 'TOGGLE_TODO',
                payload: {
                  id: todo.id
                }
              });
            }
          } 
        >
        <i
          class = {  todo.completed ? 'glyphicon glyphicon-check' : 'glyphicon glyphicon-unchecked' }
        ></i>
        </button>
          <input 
            ref = { 'edit_input' }
            class ={ 'list-input' }
            style={
              {
              textDecoration: todo.completed ? 'line-through' : 'none'
              }
            }
            onChange = {
              () => {
                store.dispatch({
                  type: 'EDIT_TODO',
                  payload: {
                    text: this.refs.edit_input.value,
                    id: todo.id
                  }
                })
              }
            }
            key={ todo.id }
            defaultValue={ todo.text}
        />
        <button
          class= { 'btn red' }
          onClick={
            () => { 
              store.dispatch({
                type: 'DELETE_TODO',
                payload: {
                  id: todo.id
                }
              });
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

class ColorContainer extends Component {
  render () {
    let { refs, listTodo } = this.props;

    return (
      <div>
      {
      colors.map(
        (color, i) => 
          <div
            key = { i }
            class = { color.class }
            onClick = {
              () => {
                store.dispatch({
                  type: 'CHANGE_COLOR_LIST_TODO',
                  payload: {
                    id: listTodo.id,
                    color: color.div_color
                  }
                })
              }
            }
          >
          </div>
      )
      }
      </div>
    );
  }
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
  
  switch(visibilityFilter) {
    case 'SHOW_ALL': 
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
  }
}

const getNewTodos = (visibleTodos, idList)  => {
  return visibleTodos.filter(v => v.idList === idList);
}


class TodoListContainer extends Component {
  render() {
  
  let {todos, visibleTodos, visibilityFilter, listTodo } = this.props;
  
  return (
    <div 
      ref = { 'color_list' }
      class= { 'list-container' }
    >
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
                idList: idLists
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
          }
         }
        />
         <i 
          class = { 'glyphicon glyphicon-pencil cursor' }
          onClick = { 
            () => {

              if (this.refs.color.className == 'hide-element') {
                this.refs.color.className = 'circle-container'
              }
              else {
                this.refs.color.className = 'hide-element'
              }
              }
            }
        ></i>
        <i 
          class = { 'glyphicon glyphicon-tasks cursor' }
        ></i>
        <i 
          class = { 'fa fa-sticky-note cursor' }
        ></i>
        <div 
        ref = { 'color' }
        class = {
          'hide-element'
        }
        >
         <ColorContainer
           refs = { this.refs }
           listTodo = { listTodo }
         >
         </ColorContainer>
        </div>
       
      </div>
      <TodoContainer 
        visibleTodos = { getNewTodos(visibleTodos, idLists) }
        key= { 1 }
        ></TodoContainer>
      <button
        ref={ 'button_save' }
        class={ 'hide-element' }
        onClick={
          () => { 
            store.dispatch({
              type: 'ADD_LIST_TODO',
              payload: {
                id: idLists++,
                color: this.refs.color_list.style.backgroundColor,
                title: this.refs.todo_title.value,
                todos: visibleTodos.map(t => t.id)
              }
            });
            console.log('visibleTodos');
            console.log(visibleTodos);
             
            this.refs.color_list.style.backgroundColor = '';
            this.refs.todo_title.value = '';
            
          }
        }
      >Save List of todos</button>
    </div>

  );
  }
}



let maxId = 0;
let idLists = 0;

class TodosApp extends Component {

  render() {

  let { todos, visibilityFilter, listTodos } = this.props;
  let visibleTodos = getVisibleTodos(todos, visibilityFilter);
  let visibleListTodos = listTodos.filter(l => l.archived === false);
  return (
    <div class="main-container">
      <div class="search-bar">
        <input type="search" class="search" placeholder="Search..." />
        <a href="#" class="logo" title="GMRUI"></a>
      </div>
      <TodoListContainer
        visibleTodos = { visibleTodos }
        visibilityFilter = { visibilityFilter }
        todos = { todos }
        listTodo = { visibleListTodos }
      >
      </TodoListContainer>
      <SavedTodoListContainer
        listTodos = { visibleListTodos }
        visibleTodos = { visibleTodos }
      >
      </SavedTodoListContainer>
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