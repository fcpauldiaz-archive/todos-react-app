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
import { visibilityApp } from './reducers/visibilityApp';
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
  listNotes,
  visibilityApp
});

const store = createStore(todoApp, loadState());


class NoteListContainer extends Component {
  render() {
    let { listNotes, visibilityApp } = this.props;
    if (visibilityApp.app === 'SHOW_NOTES' || visibilityApp.app === 'SHOW_ALL') {
   
    return (
        <div 
          ref = { 'color_list' }
          class= { 'list-container' }
        >
        <input
          placeholder = { 'Title: Enter to Save' }
          ref = { 'note_title' }
          class = { 'title-input-none' }
          onKeyPress = {
            (e) => {
              if (e.key === 'Enter') {
                store.dispatch({
                  type: 'ADD_NOTE',
                  payload: {
                    id: v4(),
                    title: this.refs.note_title.value,
                    content: this.refs.note_content.value,
                    saved: true
                  }
                })
                this.refs.note_title.value = '';
                this.refs.note_content.value = '';
              }
            }
          }
        />
       <div 
        class= { 'main-div' }
      >
        <input
          placeholder = { 'Note content: Enter to save' }
          ref = { 'note_content' }
          class= { 'main-input' }
          onClick = {  
            () => {
              this.refs.note_title.className = 'title-input'
            }
          }
          onKeyPress = {
            (e) => {
              if (e.key === 'Enter') {
                store.dispatch({
                  type: 'ADD_NOTE',
                  payload: {
                    id: v4(),
                    title: this.refs.note_title.value,
                    content: this.refs.note_content.value,
                    saved: true
                  }
                })
                this.refs.note_title.value = '';
                this.refs.note_content.value = '';
              }
            }
          }
        />
        <i 
          class = { 'glyphicon glyphicon-th-large cursor' }
          onClick = { 
            () => {
              store.dispatch({
                type: 'SET_VISIBILITY_FILTER_APP',
                payload: {
                  app: 'SHOW_ALL'
                }
              })
            }
          }
        ></i>
        <i 
          class = { 'glyphicon glyphicon-tasks cursor' }
          onClick = {
            () => {
              store.dispatch({
                type: 'SET_VISIBILITY_FILTER_APP',
                payload: {
                  app: 'SHOW_TODOS'
                }
              })
            }
          }
        ></i>
        <i 
          class = { 'fa fa-sticky-note cursor' }
          onClick = {
            () => {
              store.dispatch({
                type: 'SET_VISIBILITY_FILTER_APP',
                payload: {
                  app: 'SHOW_NOTES'
                }
              })
            }
          }
        ></i>
        <div 
        class = { 'circle-container' }
        >
        </div>
       
      </div>
    </div>
    );
    } else {
      return (<div></div>);
    }
  }
}


class SavedNoteContainer extends Component {
  render() {
    let { listNotes, visibilityApp} = this.props;
    if (visibilityApp.app === 'SHOW_NOTES' || visibilityApp.app === 'SHOW_ALL'){
      listNotes = getSearchFilterNotes(listNotes, visibilityApp.search);
      return (
        <div>
        {
          listNotes.map((note, i) =>
             <div 
              ref = { 'color_list' }
              class= { 'list-container' }
              style = {
                {
                  backgroundColor: note.color
                }
              }
              key = { note.id }
            >
              <input 
                defaultValue = { note.title }
                class={ 'title-input' }
                ref= { 'edit_note_title' }
                onChange={
                    (e) => { 
                      store.dispatch({
                        type: 'EDIT_NOTE_TITLE',
                        payload: {
                          id: note.id,
                          title: e.target.value
                        }
                      });
                    }
                  }
              />
                <div 
                class= { 'edit-div' }
              >
               <input 
                defaultValue = { note.content }
                class={ 'title-input' }
                onChange={
                    (e) => { 
                      store.dispatch({
                        type: 'EDIT_NOTE_CONTENT',
                        payload: {
                          id: note.id,
                          content: e.target.value
                        }
                      });
                    }
                  }
              />
                <i 
                  class = { 'glyphicon glyphicon-pencil cursor-edit' }
                  onClick = { 
                    () => {
                      store.dispatch({
                        type: 'SHOW_COLOR_NOTE',
                        payload: {
                          id: note.id
                        }
                      })
                    }
                  }
                ></i>
                <div 
                 style = {
                    {
                      display: note.show_color ? '': 'none'
                    }
                  }
                  class = { 'circle-container' }
                  >
                 <ColorContainer
                   note = { note }
                   current = { 'NOTE' }
                 >
                 </ColorContainer>
                 </div>
                <button
                  class={ 'btn blue size' }
                  onClick={
                    () => { 
                      store.dispatch({
                        type: 'ARCHIVE_NOTE',
                        payload: {
                          id: note.id
                        }
                      });
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
                        type: 'DELETE_NOTE',
                        payload: {
                          id: note.id
                        }
                      });
                     
                    }
                  }
                >
                <span 
                  class= { 'glyphicon glyphicon-floppy-remove padding-right' }
                >
               </span>
                 Delete
                </button>
               
                </div>
              </div>
          )
        }
        </div>
      );
    }
    else {
      return (<div></div>);
    }
  }
}


class SavedTodoListContainer extends Component {
  render() {
    let { todos, listTodos, visibilityApp } = this.props;
    if (typeof listTodos === 'undefined') {
      listTodos = [];
    }
    if (visibilityApp.app === 'SHOW_TODOS' || visibilityApp.app === 'SHOW_ALL') {
    listTodos = getSearchFilter(listTodos, visibilityApp.search);
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
              key = { list.id }
            >
              <input 
                defaultValue = { list.title }
                class={ 'title-input' }
                onChange={
                  (e) => { 
                    store.dispatch({
                      type: 'EDIT_LIST_TODO',
                      payload: {
                        id: list.id,
                        title: e.target.value
                      }
                    });
                  }
                }
              />
              <TodoContainer 
                todos = { todos }
                listTodo = { list }
                visibilityFilter = { list.visibilityFilter }
                key= { i }
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
    else {
      return (<div></div>);
    }
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

            class ={ 'list-input' }
            style={
              {
              textDecoration: todo.completed ? 'line-through' : 'none'
              }
            }
            onChange = {
              (e) => {
                store.dispatch({
                  type: 'EDIT_TODO',
                  payload: {
                    text: e.target.value,
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
    let { listTodo, note, current } = this.props;

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
                if (current === 'NOTE' ){
                  store.dispatch({
                    type: 'CHANGE_COLOR_NOTE',
                    payload: {
                      id: note.id,
                      color: color.div_color
                    }
                  })
                }
                else {
                  store.dispatch({
                    type: 'CHANGE_COLOR_LIST_TODO',
                    payload: {
                      id: listTodo.id,
                      color: color.div_color
                    }
                  })
                }
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

const getSearchFilter = (listTodos, search) => {
  
  if (search !== '') {
    console.log(listTodos.filter(listTodo => listTodo.title.includes(search)))
    return listTodos.filter(listTodo => listTodo.title.includes(search));
  }
  return listTodos; 
}
const getSearchFilterNotes = (listNotes, search) => {
  if (search !== '') {
    return listNotes.filter(note => note.title.includes(search));
  }
  return listNotes;
}

class TodoListContainer extends Component {
  render() {
  
  let {todos, listTodo, visibilityApp } = this.props;
  if (visibilityApp.app === 'SHOW_TODOS' || visibilityApp.app === 'SHOW_ALL') {
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
                title: e.target.value,
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
                text: e.target.value,
              }
            });

            e.target.value = "";
            }
          }
        }
         onClick = {
          (e) => {
            this.refs.todo_title.className = 'title-input';
          }
         }
        />
         <i 
          class = { 'glyphicon glyphicon glyphicon-th-large cursor' }
          onClick = { 
            () => {
              store.dispatch({
                type: 'SET_VISIBILITY_FILTER_APP',
                payload: {
                  app: 'SHOW_ALL'
                }
              })
            }
          }
        ></i>
        <i 
          class = { 'glyphicon glyphicon-tasks cursor' }
          onClick = {
            () => {
              store.dispatch({
                type: 'SET_VISIBILITY_FILTER_APP',
                payload: {
                  app: 'SHOW_TODOS'
                }
              })
            }
          }
        ></i>
        <i 
          class = { 'fa fa-sticky-note cursor' }
          onClick = {
            () => {
              store.dispatch({
                type: 'SET_VISIBILITY_FILTER_APP',
                payload: {
                  app: 'SHOW_NOTES'
                }
              })
            }
          }
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
    </div>

  );
  } else {
    return (<div></div>);
  }
  }
}




class TodosApp extends Component {

  render() {

  let { todos, listTodos, listNotes, visibilityApp } = this.props;
  let visibleListTodos = listTodos.filter(l => l.archived === false);
  return (
    <div class="main-container">
      <div class="search-bar">
        <input 
          type="search" 
          class="search" 
          placeholder="Search..."
          ref = { node => this.input = node } 
          onChange = {
            () => {
              store.dispatch({
                type: 'SET_SEARCH_FILTER',
                payload: {
                  search: this.input.value
                }
              })
            }
          }
          />
      </div>
      <TodoListContainer
        todos = { todos }
        listTodo = { visibleListTodos }
        visibilityApp = { visibilityApp }
      >
      </TodoListContainer>
      <NoteListContainer
       listNotes = { listNotes }
       visibilityApp = { visibilityApp }
      > 
      </NoteListContainer>
      <SavedTodoListContainer
        listTodos = { visibleListTodos }
        todos = { todos }
        visibilityApp = { visibilityApp }
      >
      </SavedTodoListContainer>
      <SavedNoteContainer
        listNotes = { listNotes }
        visibilityApp = { visibilityApp }
      >
      </SavedNoteContainer>
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