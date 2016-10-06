import React from 'react';
import v4 from 'uuid-v4';
const { Component } = React;
import {
  editListTod, addTodoToList,
  addNewTodos, showColorsTodo,
  archiveListTodo, archiveTodo, deleteListTodo,
  deleteTodos
} from './../actions/actionListTodos';
import { FilterButtons } from './../components/FilterButtons';
import { getTodosInList, getVisibleTodos, 
    getUnSaved, getNewTodos, 
    getUnArchived, getUnArchivedNotes,
    getSearchFilter, getSearchFilterNotes
  } from './../helpFunctions/filterFunctions';

import { ColorContainer } from './ColorContainer';
import { TodoContainer } from './TodoContainer';
import { FilterLink } from './../components/FilterLink';

class SavedTodoListContainer extends Component {
  render() {
    let { todos, listTodos, visibilityApp, dispatch } = this.props;
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
                    dispatch(editListTodo(list.id, e.target.value));
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
                  dispatch(addTodoToList(newId, e.target.value));
                  dispatch(addNewTodos(list.id, newId));

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
                dispatch = { dispatch }
              ></TodoContainer>
              <div 
                class= { 'edit-div' }
              >
                <i 
                  class = { 'glyphicon glyphicon-pencil cursor edit' }
                  onClick = { 
                    () => {
                      dispatch(showColorsTodo(list.id));
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
                   dispatch = { dispatch }
                 >
                 </ColorContainer>
                 </div>
                <button
                  class={ 'btn blue size' }
                  onClick={
                    () => { 
                      dispatch(archiveListTodo(list.id));

                      list.todos.map(id =>
                        dispatch(archiveTodo(id))
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
                      dispatch(deleteListTodo(list.id));
                     
                      list.todos.map(id => 
                        dispatch(deleteTodos(id))
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
                    dispatch = { dispatch }
                    >ALL</FilterLink>
                    {' '}
                    <FilterLink
                    visibilityFilter="SHOW_COMPLETED"
                    currentVisibilityFilter = { list.visibilityFilter }
                    idList = { list.id }
                    dispatch = { dispatch }
                    >Completed</FilterLink>
                    {' '}
                    <FilterLink
                    visibilityFilter="SHOW_ACTIVE"
                    currentVisibilityFilter = { list.visibilityFilter }
                    idList = { list.id }
                    dispatch = { dispatch }
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


export  { SavedTodoListContainer };