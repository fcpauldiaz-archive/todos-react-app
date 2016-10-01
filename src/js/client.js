import { createStore, combineReducers } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import deepFreeze from 'deep-freeze';
import expect from 'expect';
import { Provider, connect } from 'react-redux';
import v4 from 'uuid-v4';
import '../styles/index.scss';


import { todos } from './reducers/todos';
import { colorConstant } from './containers/colorConstant';
import { listTodos } from './reducers/listTodos';
import { listNotes } from './reducers/notes';

const { Component } = React;

const loadState = () => {
  try{
    let result = JSON.parse(localStorage.getItem('state'));
    return result ? result : undefined;
  }
  catch(err){
    return undefined;
  }
}

const saveState = (state) => {
  try{
    localStorage.setItem('state', JSON.stringify(state));
  }
  catch(err){
    console.log(err);
    // Log
  }
}

const todoApp = combineReducers({
  todos,
  listTodos,
  listNotes
});

const store = createStore(todoApp, loadState());

class SavedTodoListContainer extends Component {
  render() {
    let { todos, listTodos } = this.props;
    if (typeof listTodos === 'undefined') {
      listTodos = [];
    }
    console.log('asdf');
    console.log(todos);
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
                onChange={
                    () => { 
                      store.dispatch({
                        type: 'EDIT_LIST_TODO',
                        payload: {
                          id: list.id,
                          title: this.refs.todo_title.value,
                        }
                      });
                    }
                  }
              />
              <TodoContainer 
                todos = { todos }
                listTodo = { list }
                visibilityFilter = { list.visibilityFilter }
                key= { 1 }
              ></TodoContainer>
              <div 
                class= { 'edit-div' }
              >
                <i 
                  class = { 'glyphicon glyphicon-pencil cursor-edit' }
                  onClick = { 
                    () => {
                      store.dispatch({
                        type: 'SHOW_COLORS',
                        payload: {
                          id: list.id
                        }
                      })
                    }
                  }
                ></i>
                <div 
                 style = {
                    {
                      display: list.show_color ? '': 'none'
                    }
                  }
                  class = { 'circle-container' }
                  >
                 <ColorContainer
                   listTodo = { list }
                 >
                 </ColorContainer>
                 </div>
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
                      list.todos.map(id =>
                        store.dispatch({
                          type: 'ARCHIVE_TODO',
                          payload: { id }
                        })
                      );
                    }
                  }
                >  
                <span 
                  class= { 'glyphicon glyphicon-floppy-disk padding-right' }
                >
               </span>Archive </button>
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
                      list.todos.map(id => 
                        store.dispatch({
                          type: 'DELETE_TODO',
                          payload: {
                            id
                          }
                        })
                      )
                    }
                  }
                >
                <span 
                  class= { 'glyphicon glyphicon-floppy-remove padding-right' }
                >
               </span>
                 Delete
                </button>
                
                <div 
                    class = { 'margin-top' }
                    ref={ 'text_filter' }
                  >
                  <FilterLink
                    visibilityFilter="SHOW_ALL"
                    currentVisibilityFilter = { list.visibilityFilter }
                    idList = { list.id }
                    >ALL</FilterLink>
                    {' '}
                    <FilterLink
                    visibilityFilter="SHOW_COMPLETED"
                    currentVisibilityFilter = { list.visibilityFilter }
                    idList = { list.id }
                    >Completed</FilterLink>
                    {' '}
                    <FilterLink
                    visibilityFilter="SHOW_ACTIVE"
                    currentVisibilityFilter = { list.visibilityFilter }
                    idList = { list.id }
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
  let { todos, listTodo, visibilityFilter } = this.props;
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
          class = {  todo.completed ? 'glyphicon glyphicon-ok' : 'glyphicon glyphicon-unchecked' }
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
    let { listTodo } = this.props;

    return (
      <div>
      {
      colorConstant.map(
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

const FilterLink = ({visibilityFilter, currentVisibilityFilter,children, idList}) => {
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
          payload: { 
            idList,
            visibilityFilter
          }
        });
      }
    }
    >
  { children } </a>
}

const getTodosInList = (todos, listTodo) => {
  if (listTodo.length === 0) {
    return todos;
  }
  //let returnValue = listTodo.map((l) => todos.filter(todo => l.todos.indexOf(todo.id) === -1))
  let array = [];
  for (let todos of listTodo) { array = array.concat(todos.todos) }
  let returnValue = todos.filter(t => !array.includes(t.id));
  return returnValue;
}

const getVisibleTodos = (todos, visibilityFilter) => {
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

const getUnSaved = (todos) => {
  return todos.filter(t => t.saved === false);
}

const getNewTodos = (todos, listTodo)  => {
  if (typeof listTodo.todos !== 'undefined') {
    return listTodo.todos.map((idList) => todos.filter(v => v.id === idList)[0]).filter(f => f !== undefined);
  }
  return todos;
}

const getUnArchived = (todos) => {
  return todos.filter (t => t.archived === false);
}

class TodoListContainer extends Component {
  render() {
  
  let {todos, listTodo } = this.props;
  return (
    <div 
      ref = { 'color_list' }
      class= { 'list-container' }
    >
      <input 
        placeholder={
          'Title: Enter to save'
        }
        class={ 'title-input-none' }
        ref= { "todo_title" }
        onKeyPress = {
          (e) => {
            if (e.key === 'Enter') {
                store.dispatch({
              type: 'ADD_LIST_TODO',
              payload: {
                id: v4(),
                color: this.refs.color_list.style.backgroundColor,
                title: this.refs.todo_title.value,
                todos: getTodosInList(getUnArchived(todos), listTodo).map(t => t.id)
              }
            });
            todos.map(t => {
              store.dispatch({
                type: 'SAVE_TODO',
                payload: {
                  id: t.id
                }
              })
            });
            this.refs.color_list.style.backgroundColor = '';
            this.refs.todo_title.value = '';
            }
          }
        }
      />
      <div 
        class= { 'main-div' }
      >
      <input 
        class = { 'main-input' }
        placeholder = { 'Pending todo: Enter to save' }
        onKeyPress={
          (e) => { 
            if (e.key === 'Enter') {

            store.dispatch({
              type: 'ADD_TODO',
              payload: {
                id: v4(),
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
          }
         }
        />
         <i 
          class = { 'glyphicon glyphicon-pencil cursor' }
          onClick = { 
            () => {
              store.dispatch({
                type: 'SHOW_COLORS',
                payload: {
                  id: listTodo.id
                }
              })
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
        style = {
          {
            display: listTodo.show_color ? '': 'none'
          }
        }
        class = { 'circle-container' }
        >
         <ColorContainer
           listTodo = { listTodo }
         >
         </ColorContainer>
        </div>
       
      </div>
      <TodoContainer 
        todos = { getUnSaved(todos) }
        listTodo = { listTodo }
        visibilityFilter = { listTodo.visibilityFilter }
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
                id: v4(),
                color: this.refs.color_list.style.backgroundColor,
                title: this.refs.todo_title.value,
                todos: getTodosInList(getUnArchived(todos), listTodo).map(t => t.id)
              }
            });
            todos.map(t => {
              store.dispatch({
                type: 'SAVE_TODO',
                payload: {
                  id: t.id
                }
              })
            });
            this.refs.color_list.style.backgroundColor = '';
            this.refs.todo_title.value = '';
            
          }
        }
      >Save List of todos</button>
    </div>

  );
  }
}




class TodosApp extends Component {

  render() {

  let { todos, listTodos } = this.props;
  let visibleListTodos = listTodos.filter(l => l.archived === false);
  return (
    <div class="main-container">
      <div class="search-bar">
        <input type="search" class="search" placeholder="Search..." />
        <a href="#" class="logo" title="GMRUI"></a>
      </div>
      <TodoListContainer
        todos = { todos }
        listTodo = { visibleListTodos }
      >
      </TodoListContainer>
      <SavedTodoListContainer
        listTodos = { visibleListTodos }
        todos = { todos }
      >
      </SavedTodoListContainer>
    </div>
  );
  }
}



const render = () => {
  console.log(store.getState());
  saveState(store.getState());
  ReactDOM.render(
    <TodosApp
      { ...store.getState() }
    />,
    document.getElementById('root')
  );
};

render();
store.subscribe(render);