import React from 'react';
const { Component } = React;
import {
  toggleTodo, editTodo,
  deleteTodo, addTodo,
} from './../actions/actionTodos';
import { getUnSaved } from './../helpFunctions/filterFunctions';
import { FilterButtons } from './../components/FilterButtons';
import { ColorContainer } from './ColorContainer';
import { TodoContainer } from './TodoContainer';
class TodoListContainer extends Component {
  render() {
  
  let {todos, listTodo, visibilityApp, dispatch } = this.props;
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
              dispatch(addListTodo(
                e.target.value,
                getTodosInList(getUnArchived(todos), listTodo).map(t => t.id)
              ));
            todos.map(t => {
              dispatch(saveTodos(t.id));
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

            dispatch(addTodo(e.target.value));

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
          dispatch = { dispatch }
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
           dispatch = { dispatch }
         >
         </ColorContainer>
        </div>
       
      </div>
      <TodoContainer 
        todos = { getUnSaved(todos) }
        listTodo = { listTodo }
        visibilityFilter = { listTodo.visibilityFilter }
        key= { 1 }
        dispatch = { dispatch }
        ></TodoContainer>
    </div>

  );
  } else {
    return (<div></div>);
  }
  }
}

export { TodoListContainer }