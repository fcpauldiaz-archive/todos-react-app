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
  addNote, editNoteTitle,
  editNoteContent, showColorNote,
  archiveNote, deleteNote, changeColorNote
} from './actions/actionNotes';

import {
    toggleTodo, editTodo,
    deleteTodo, addTodo
  } from './actions/actionTodos';
import { FilterButtons } from './components/FilterButtons';
import { Search } from './components/Search';

import { todos } from './reducers/todos';
import { colorConstant } from './containers/colorConstant';
import { listTodos } from './reducers/listTodos';
import { listNotes } from './reducers/notes';
import { visibilityApp } from './reducers/visibilityApp';
const { Component } = React;
import { getTodosInList, getVisibleTodos, 
    getUnSaved, getNewTodos, 
    getUnArchived, getUnArchivedNotes,
    getSearchFilter, getSearchFilterNotes
  } from './helpFunctions/filterFunctions';

import { NoteListContainer } from './containers/NoteListContainer';
import { SavedNoteContainer } from './containers/SavedNoteListContainer';
import { ColorContainer } from './containers/ColorContainer';
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
                   dispatch = { store.dispatch }
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



class TodoListContainer extends Component {
  render() {
  
  let {todos, listTodo, visibilityApp } = this.props;
  if (visibilityApp.app !== 'SHOW_NOTES') {
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
        <FilterButtons
          dispatch = { store.dispatch }
        >
        </FilterButtons>
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
  let  visibleListTodos = listTodos.filter(l => l.archived === false);
  let  visibleListNotes = getUnArchived(listNotes);
  if (visibilityApp.app === 'SHOW_ARCHIVED' ) {
    visibleListTodos = listTodos.filter(l => l.archived === true);
    visibleListNotes = listNotes.filter(l => l.archived === true);
  }
 
  return (
    <div class="main-container">
      <Search
        dispatch = { store.dispatch }
      >
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
       dispatch = { store.dispatch }
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
        dispatch = { store.dispatch }
      >
      </SavedNoteContainer>
    </div>
  );
  }
}



const render = () => {
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