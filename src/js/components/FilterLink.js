import React from 'react';

const FilterLink = 
  ({
    visibilityFilter, 
    currentVisibilityFilter, 
    onClick,
    children
  }) => {
  if (visibilityFilter === currentVisibilityFilter) {
  return <strong> { children } </strong>;
  }

  return <a
    href="#"
    onClick={ onClick }
    >
  { children } </a>
}

export { FilterLink };
