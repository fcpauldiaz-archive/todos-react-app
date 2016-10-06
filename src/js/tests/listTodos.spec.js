import { listTodos } from '../reducers/listTodos';
import deepFreeze from 'deep-freeze';
import expect from 'expect';

const testAddListTodo = () => {
  const stateBefore = [];
  const date = new Date();
  const action = {
    type: 'ADD_LIST_TODO',
    payload: {
      id: 0,
      title: 'Limpiar mi casa',
      creation_date: date
    }
  }

  const stateAfter = [{
    id: 0,
    title: 'Limpiar mi casa',
    archived: false,
    show_color: false,
    creation_date: date
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    listTodos(stateBefore, action)
  ).toEqual(stateAfter);
}

const testEditListTodo = () => {
  const date = new Date();
  const stateBefore = [{
    id: 0,
    title: 'TODO',
    archived: false,
    show_color: false,
    creation_date: date
  },
  {
    id: 1,
    title: 'LIST',
    archived: false,
    show_color: false,
    creation_date: date
  }];
  const action = {
    type: 'EDIT_LIST_TODO',
    payload: {
      id: 1,
      title: 'Limpiar mi casa',
      modification_date: date
    }
  }

  const stateAfter = [{
    id: 0,
    title: 'TODO',
    archived: false,
    show_color: false,
    creation_date: date
  },
  {
    id: 1,
    title: 'Limpiar mi casa',
    archived: false,
    show_color: false,
    creation_date: date,
    modification_date: date
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    listTodos(stateBefore, action)
  ).toEqual(stateAfter);
}
const testChangeColorListTodo = () => {
  const date = new Date();
  const stateBefore = [{
    id: 0,
    title: 'TODO',
    archived: false,
    show_color: false,
    creation_date: date
  },
  {
    id: 1,
    title: 'LIST',
    archived: false,
    show_color: false,
    creation_date: date
  }];
  const action = {
    type: 'CHANGE_COLOR_LIST_TODO',
    payload: {
      id: 1,
      color: 'blue',
      modification_date: date
    }
  }

  const stateAfter = [{
    id: 0,
    title: 'TODO',
    archived: false,
    show_color: false,
    creation_date: date
  },
  {
    id: 1,
    title: 'LIST',
    archived: false,
    show_color: false,
    color: 'blue',
    creation_date: date,
    modification_date: date
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    listTodos(stateBefore, action)
  ).toEqual(stateAfter);
}
const testArchiveListTodo = () => {
  const date = new Date();
  const stateBefore = [{
    id: 0,
    title: 'TODO',
    archived: false,
    show_color: false,
    creation_date: date
  },
  {
    id: 1,
    title: 'LIST',
    archived: false,
    show_color: false,
    creation_date: date
  }];
  const action = {
    type: 'TOGGLE_ARCHIVE_LIST_TODO',
    payload: {
      id: 1,
      modification_date: date
    }
  }

  const stateAfter = [{
    id: 0,
    title: 'TODO',
    archived: false,
    show_color: false,
    creation_date: date
  },
  {
    id: 1,
    title: 'LIST',
    archived: true,
    show_color: false,
    creation_date: date,
    modification_date: date
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    listTodos(stateBefore, action)
  ).toEqual(stateAfter);
}

const testShowColor = () => {
  const date = new Date();
  const stateBefore = [{
    id: 0,
    title: 'TODO',
    archived: false,
    show_color: false,
    creation_date: date
  },
  {
    id: 1,
    title: 'LIST',
    archived: false,
    show_color: false,
    creation_date: date
  }];
  const action = {
    type: 'SHOW_COLORS',
    payload: {
      id: 1
    }
  }

  const stateAfter = [{
    id: 0,
    title: 'TODO',
    archived: false,
    show_color: false,
    creation_date: date
  },
  {
    id: 1,
    title: 'LIST',
    archived: false,
    show_color: true,
    creation_date: date
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    listTodos(stateBefore, action)
  ).toEqual(stateAfter);
}

const testVisibilityFilter = () => {
  const date = new Date();
  const stateBefore = [{
    id: 0,
    title: 'TODO',
    archived: false,
    show_color: false,
    creation_date: date
  },
  {
    id: 1,
    title: 'LIST',
    archived: false,
    show_color: false,
    creation_date: date
  }];
  const action = {
    type: 'SET_VISIBILITY_FILTER',
    payload: {
      idList: 1,
      visibilityFilter: 'SHOW_ALL'
    }
  }

  const stateAfter = [{
    id: 0,
    title: 'TODO',
    archived: false,
    show_color: false,
    creation_date: date
  },
  {
    id: 1,
    title: 'LIST',
    archived: false,
    show_color: false,
    visibilityFilter: 'SHOW_ALL',
    creation_date: date,
  }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    listTodos(stateBefore, action)
  ).toEqual(stateAfter);
}

testAddListTodo();
testEditListTodo();
testChangeColorListTodo();
testArchiveListTodo();
testShowColor();
testVisibilityFilter();


console.log("All list todo tests passed!");
export {  };