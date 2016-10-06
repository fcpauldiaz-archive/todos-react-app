import React from 'react';
const { Component } = React;
import { editNoteTitle,
  editNoteContent, showColorNote,
  archiveNote, deleteNote, changeColorNote
} from './../actions/actionNotes';
import { FilterButtons } from './../components/FilterButtons';
import { getSearchFilterNotes } from './../helpFunctions/filterFunctions';
import { ColorContainer } from './ColorContainer';
import { TodoContainer } from './TodoContainer';

class SavedNoteContainer extends Component {
  render() {
    let { listNotes, visibilityApp, dispatch} = this.props;
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
                      dispatch(editNoteTitle(note.id, e.target.value));
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
                      dispatch(editNoteContent(note.id, e.target.value));
                    }
                  }
              />
                <i 
                  class = { 'glyphicon glyphicon-pencil cursor edit' }
                  onClick = { 
                    () => {
                      dispatch(showColorNote(note.id));
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
                   dispatch = { dispatch }
                 >
                 </ColorContainer>
                 </div>
                <button
                  class={ 'btn blue size' }
                  onClick={
                    () => { 
                      dispatch(archiveNote(note.id));
                  
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
                      dispatch(deleteNote(note.id));
                     
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

export { SavedNoteContainer }