import React from 'react';
import { setVisibleFilter } from './../actions/actionListTodos';

  const FilterLink = ({visibilityFilter, currentVisibilityFilter,children, idList, dispatch}) => {
  if (visibilityFilter === currentVisibilityFilter) {
    return <strong> { children } </strong>;
  }

  return <a
    href="#"
    onClick={
      (e) => {
        e.preventDefault();
        dispatch(setVisibleFilter(idList,visibilityFilter));
      }
    }
    >
  { children } </a>
}
export { FilterLink };
