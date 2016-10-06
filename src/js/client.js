import { createStore, combineReducers, applyMiddleware } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import v4 from 'uuid-v4';
import '../styles/index.scss';
import undoable from 'redux-undo';
import { ActionCreators } from 'redux-undo';
import { loadState, saveState, logger, crashReporter } from './helpFunctions/middleware';
import {
    editListTodo, addTodoToList,
    addNewTodos, showColorsTodo,
    archiveListTodo, archiveTodo,
    deleteListTodo, deleteTodos,
    changeColorListTodo, setVisibleFilter,
    addListTodo, saveTodos
  } from './actions/actionListTodos';

import {
    toggleTodo, editTodo,
    deleteTodo, addTodo
  } from './actions/actionTodos';
import { FilterButtonsLink } from './containers/FilterButtonsContainer';
import { setSearch } from './actions/actionSearch';

import { todos } from './reducers/todos';
import { colorConstant } from './containers/colorConstant';
import { listTodos } from './reducers/listTodos';
import { listNotes } from './reducers/notes';
import { visibilityApp } from './reducers/visibilityApp';
const { Component } = React;
import {} from './tests/todos.spec';
import {} from './tests/notes.spec';
import {} from './tests/listTodos.spec';






const todoApp = combineReducers({
  todos,
  listTodos,
  listNotes,
  visibilityApp
});

const store = createStore(todoApp, loadState(),applyMiddleware(logger, crashReporter));


class NoteListContainer extends Component {
  render() {
    let { listNotes, visibilityApp } = this.props;
    if (visibilityApp.app !== 'SHOW_TODOS') {
   
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
                store.dispatch(addNote(
                  this.refs.note_title.value,
                  this.refs.note_content.value
                ))
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
                 store.dispatch(addNote(
                  this.refs.note_title.value,
                  this.refs.note_content.value
                ));
                this.refs.note_title.value = '';
                this.refs.note_content.value = '';
              }
            }
          }
        />

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
    if (visibilityApp.app !== 'SHOW_TODOS'){
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
                      store.dispatch(editNoteTitle(note.id, e.target.value));
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
                      store.dispatch(editNoteContent(note.id, e.target.value));
                    }
                  }
              />
                <i 
                  class = { 'glyphicon glyphicon-pencil cursor edit' }
                  onClick = { 
                    () => {
                      store.dispatch(showColorNote(note.id));
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
                      store.dispatch(archiveNote(note.id));
                  
                    }
                  }
                >  
                <span 
                  class= { 'glyphicon glyphicon-trash padding-right' }
                >
               </span>Archive </button>
                <button
                  class={ 'btn red size' }
                  onClick={
                    () => { 
                      store.dispatch(deleteNote(note.id));
                     
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
    if (visibilityApp.app !== 'SHOW_NOTES') {
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
                    store.dispatch(editListTodo(list.id, e.target.value));
                  }
                }
              />
            <input 
              class = { 'main-input edit' }
              placeholder = { 'Pending todo: Enter to save' }
              onKeyPress={
                (e) => { 
                  if (e.key === 'Enter') {
                  let newId = v4();
                  console.log()
                  store.dispatch(addTodoToList(newId, e.target.value));
                  store.dispatch(addNewTodos(list.id, newId));

                  e.target.value = "";
                  }
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
                  class = { 'glyphicon glyphicon-pencil cursor edit' }
                  onClick = { 
                    () => {
                      store.dispatch(showColorsTodo(list.id));
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
                      store.dispatch(archiveListTodo(list.id));

                      list.todos.map(id =>
                        store.dispatch(archiveTodo(id))
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
                      store.dispatch(deleteListTodo(list.id));
                     
                      list.todos.map(id => 
                        store.dispatch(deleteTodos(id))
                      )
                    }
                  }
                >
                <span 
                  class= { 'glyphicon glyphicon-trash padding-right' }
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
              store.dispatch(toggleTodo(todo.id));
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
                store.dispatch(editTodo(todo.id, e.target.value));
              }
            }
            key={ todo.id }
            defaultValue={ todo.text}
        />
        <button
          class= { 'btn red' }
          onClick={
            () => { 
              store.dispatch(deleteTodo(todo.id));
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
                  store.dispatch(changeColorNote(note.id, color.div_color));
                }
                else {
                  store.dispatch(changeColorListTodo(listTodo.id, color.div_color));
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
        store.dispatch(setVisibleFilter(idList,visibilityFilter));
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

const getUnArchivedNotes = (notes) => {
  return notes.filter(n => n.archived === false);
}

const getSearchFilter = (listTodos, search) => {
  
  if (search !== '') {
    
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

let TodoListContainer = ({todos, listTodo, visibilityApp}) => {
  console.log(this);
  console.log(todos);
  if (visibilityApp.app !== 'SHOW_NOTES') {
  return (
    <div 
      
      class= { 'list-container' }
    >
      <input 
        placeholder={
          'Title: Enter to save'
        }
        class={ 'title-input' }
       
        onKeyPress = {
          (e) => {
            if (e.key === 'Enter') {
              store.dispatch(addListTodo(
                e.target.value,
                getTodosInList(getUnArchived(todos), listTodo).map(t => t.id)
              ));
            todos.map(t => {
              store.dispatch(saveTodos(t.id));
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

            store.dispatch(addTodo(e.target.value));

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
        <FilterButtonsLink>
        </FilterButtonsLink>
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

TodoListContainer = connect()(TodoListContainer);

const Search = () => {
   return ( 
    <div class="search-bar">
      <input 
        type="search" 
        class= { 'search' }
        placeholder= { 'Search...'}
        onChange = {
          (e) => {
            store.dispatch(setSearch(e.target.value));
          }
        }
        />
    </div>
  );
}




class TodosApp extends Component {

  render() {

  let {todos, listTodos, listNotes, visibilityApp } = store.getState();
  console.log(todos);
  let  visibleListTodos = listTodos.filter(l => l.archived === false);
  let  visibleListNotes = getUnArchived(listNotes);
  if (visibilityApp.app === 'SHOW_ARCHIVED' ) {
    visibleListTodos = listTodos.filter(l => l.archived === true);
    visibleListNotes = listNotes.filter(l => l.archived === true);
  }
 
  return (
    <div class="main-container">
      <Search>
      </Search>
      <TodoListContainer
        todos = { todos }
        listTodo = { visibleListTodos }
        visibilityApp = { visibilityApp }
      >
      </TodoListContainer>
      <NoteListContainer
       listNotes = { visibleListNotes }
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
        listNotes = { visibleListNotes }
        visibilityApp = { visibilityApp }
      >
      </SavedNoteContainer>
    </div>
  );
  }
}


ReactDOM.render(
  <Provider store={ store }>
    <TodosApp />
  </Provider>,
  document.getElementById('root')
);

store.subscribe(() => {
  saveState(store.getState());
});