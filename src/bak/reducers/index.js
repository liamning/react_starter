import { combineReducers } from 'redux'
import todos from './todos'
import basicForm from './basicForm'
import clientForm from './clientForm'
import visibilityFilter from './visibilityFilter'

export default combineReducers({
  todos,
  visibilityFilter,
  basicForm,
  clientForm
})
