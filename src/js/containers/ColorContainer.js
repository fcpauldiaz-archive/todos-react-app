import React from 'react';
const { Component } = React;
import { changeColorNote } from './../actions/actionNotes';
import { changeColorListTodo } from './../actions/actionListTodos';
import { FilterButtons } from './../components/FilterButtons';
import { colorConstant } from './../containers/colorConstant';

class ColorContainer extends Component {
  render () {
    let { listTodo, note, current, dispatch } = this.props;

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
                  dispatch(changeColorNote(note.id, color.div_color));
                }
                else {
                  dispatch(changeColorListTodo(listTodo.id, color.div_color));
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
export { ColorContainer };