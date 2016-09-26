import React from 'react';

const FilterLink = 
  ({
    visibilityFilter, 
    currentVisibilityFilter, 
    children,
    onClick 
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
