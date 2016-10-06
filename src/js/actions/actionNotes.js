import v4 from 'uuid-v4';
export const addNote = (title, content) => ({
  type: 'ADD_NOTE',
  payload: {
    id: v4(),
    title: title,
    content: content,
    saved: true,
    creation_date: new Date()
  }
})

export const setVisibleApp = (filter) => ({
  type: 'SET_VISIBILITY_FILTER_APP',
  payload: {
    app: filter
  }
})

export const editNoteTitle = (id, title) => ({
  type: 'EDIT_NOTE_TITLE',
  payload: {
    id: id,
    title: title,
    modification_date: new Date()
  }
})

export const editNoteContent  = (id, content) => ({
  type: 'EDIT_NOTE_CONTENT',
  payload: {
    id,
    content,
    modification_date: new Date()
  }
})

export const showColorNote = (id) => ({
  type: 'SHOW_COLOR_NOTE',
  payload: {
    id
  }
})

export const archiveNote = (id) => ({
  type: 'TOGGLE_ARCHIVE_NOTE',
  payload: {
    id,
    modification_date: new Date()
  }
})

export const deleteNote = (id) => ({
  type: 'DELETE_NOTE',
  payload: {
    id
  }
});

export const changeColorNote = (id, color) => ({
  type: 'CHANGE_COLOR_NOTE',
  payload: {
    id, color,
    modification_date: new Date()
  }
})
