import React from 'react';
import { setSearch } from './../actions/actionSearch';

export const Search = ({dispatch}) => {
   return ( 
    <div class="search-bar">
      <input 
        type="search" 
        class= { 'search' }
        placeholder= { 'Search...'}
        onChange = {
          (e) => {
            dispatch(setSearch(e.target.value));
          }
        }
        />
    </div>
  );
}