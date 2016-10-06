import { createStore, combineReducers, applyMiddleware } from 'redux';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, connect } from 'react-redux';
import keydown from 'react-keydown';
import '../styles/index.scss';
import undoable from 'redux-undo';
import { ActionCreators } from 'redux-undo';
import { loadState, saveState, logger, crashReporter } from './helpFunctions/middleware';

import { Search } from './components/Search';

import { todos } from './reducers/todos';
import { colorConstant } from './containers/colorConstant';
import { listTodos } from './reducers/listTodos';
import { listNotes } from './reducers/notes';
import { visibilityApp } from './reducers/visibilityApp';
const  { Component } = React;
import {  getUnArchived } from './helpFunctions/filterFunctions';

import { NoteListContainer } from './containers/NoteListContainer';
import { SavedNoteContainer } from './containers/SavedNoteListContainer';
import { SavedTodoListContainer } from './containers/SavedTodoListContainer';
import { ColorContainer } from './containers/ColorContainer';
import { TodoContainer } from './containers/TodoContainer';
import { TodoListContainer } from './containers/TodoListContainer';
import {} from './tests/todos.spec';
import {} from './tests/notes.spec';
import {} from './tests/listTodos.spec';



const todoApp = combineReducers({
  todos: undoable(todos),
  listTodos: undoable(listTodos),
  listNotes: undoable(listNotes),
  visibilityApp: undoable(visibilityApp)
});

const store = createStore(todoApp, loadState(),applyMiddleware(logger, crashReporter));



class TodosApp extends Component {

  @keydown('ctrl+z' )
  undo() {
    store.dispatch(ActionCreators.undo());
  }
  @keydown('ctrl+y' )
  redo() {
    store.dispatch(ActionCreators.redo());
  }

  render() {

  let { todos, listTodos, listNotes, visibilityApp } = this.props;
  todos = todos.present;
  listNotes = listNotes.present;
  listTodos = listTodos.present;
  visibilityApp = visibilityApp.present;
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
        dispatch = { store.dispatch }
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
        dispatch = { store.dispatch }
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