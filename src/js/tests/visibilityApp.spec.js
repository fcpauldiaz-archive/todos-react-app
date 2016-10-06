import { visibilityApp } from '../reducers/visibilityApp';
import deepFreeze from 'deep-freeze';
import expect from 'expect';

const testShowTodos = () => {
  const stateBefore = {
    app: 'SHOW_TODOS',
    search: ''
  };

  const action = {
    type: 'SET_VISIBILITY_FILTER_APP',
    payload: {
      app: 'SHOW_NOTES',
    }
  }

  const stateAfter = {
    app: 'SHOW_NOTES',
    search: ''
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    visibilityApp(stateBefore, action)
  ).toEqual(stateAfter);
}
const testSearchFilter = () => {
  const stateBefore = {
    app: 'SHOW_TODOS',
    search: ''
  };

  const action = {
    type: 'SET_SEARCH_FILTER',
    payload: {
      search: 'TEST',
    }
  }

  const stateAfter = {
    app: 'SHOW_TODOS',
    search: 'TEST'
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    visibilityApp(stateBefore, action)
  ).toEqual(stateAfter);
}


testShowTodos();
testSearchFilter();
console.log("All visibilityApp tests passed!");
export {  };