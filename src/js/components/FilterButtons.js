import React from 'react';
import { setVisibleApp } from './../actions/actionNotes';

export const FilterButtons = ({dispatch}) => {
  return (
    <div 
      style = {
        {
          'display': 'inline-block'
        }
      }
      >
       <i 
      class = { 'glyphicon glyphicon-th-large cursor toltip' }
      onClick = { 
        () => {
          dispatch(setVisibleApp('SHOW_ALL'));
        }
      }
    >
      <span class="tltext">SHOW ALL</span>
    </i>
    <i 
      class = { 'glyphicon glyphicon-tasks cursor toltip' }
      onClick = {
        () => {
         dispatch(setVisibleApp('SHOW_TODOS'));
        }
      }
    >
      <span class="tltext">SHOW TODOS</span>
    </i>
    <i 
      class = { 'fa fa-sticky-note cursor toltip' }
      onClick = {
        () => {
         dispatch(setVisibleApp('SHOW_NOTES'));
        }
      }
    >          
      <span class="tltext">SHOW NOTES</span>
    </i>
    <i 
      class = { 'glyphicon glyphicon-folder-open cursor toltip' }
      onClick = {
        () => {
          dispatch(setVisibleApp('SHOW_ARCHIVED'))
        }
      }
    >
      <span class="tltext">SHOW ALL ARCHIVED</span>
    </i>
  </div>
  );
}