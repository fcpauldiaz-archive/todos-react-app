import React from 'react';
const { Component } = React;

const colors = [
  {
    class: 'circle-black',
    div_color: 'black'
  },
  {
    class: 'circle-blue',
    div_color: 'blue'
  },
  {
    class: 'circle-red',
    div_color: 'red'
  },
  {
    class: 'circle-orange',
    div_color: 'orange'
  },
];


class ColorContainer extends Component {
  render () {
    let { refs } = this.props;

    return (
      <div>
      {
      colors.map(
        (color, i) => 
          <div
            key = { i }
            class = { color.class }
            onClick = {
              () => {
                refs.color_list.style.backgroundColor = color.div_color;
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