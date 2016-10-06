import React from 'react';
const { Component } = React;
import {
  addNote, editNoteTitle,
  editNoteContent, showColorNote,
  archiveNote, deleteNote, changeColorNote
} from './../actions/actionNotes';
import { FilterButtons } from './../components/FilterButtons';

class NoteListContainer extends Component {
  render() {
    let { listNotes, visibilityApp, dispatch} = this.props;
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
                dispatch(addNote(
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
                 dispatch(addNote(
                  this.refs.note_title.value,
                  this.refs.note_content.value
                ));
                this.refs.note_title.value = '';
                this.refs.note_content.value = '';
              }
            }
          }
        />
        <FilterButtons
          dispatch = { dispatch }
        >
        </FilterButtons>
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
export { NoteListContainer };
