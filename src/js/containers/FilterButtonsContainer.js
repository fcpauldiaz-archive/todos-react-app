import { connect } from 'react-redux';
import { setVisibleApp } from './../actions/actionNotes';
import { FilterButtons  }from './../components/FilterButtons';

const mapStateToProps = (state, ownProps) => ({
 
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onShowAllClick: () => {
    dispatch(setVisibleApp('SHOW_ALL'));
  },
  onShowTodosClick: () => {
    dispatch(setVisibleApp('SHOW_TODOS'));
  },
  onShowNotesClick: () => {
    dispatch(setVisibleApp('SHOW_NOTES'));
  },
   onShowArchivedClick: () => {
    dispatch(setVisibleApp('SHOW_ARCHIVED'));
  },
 
})

const FilterButtonsLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterButtons)

export {  FilterButtonsLink }