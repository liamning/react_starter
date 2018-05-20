//import { CALL_API, Schemas } from '../middleware/api'

export const USER_REQUEST = 'USER_REQUEST'
export const USER_SUCCESS = 'USER_SUCCESS'
export const USER_FAILURE = 'USER_FAILURE'


export const ADD_TODO = 'ADD_TODO'
export const loadUser = text=> {
  return {
    type: ADD_TODO,
    text
  }
}

export const VIEW_FORM = 'VIEW_FORM'
export const viewForm = formData => {
  return {
    type: VIEW_FORM,
    formData
  }
}

export const VIEW_CLIENT = 'VIEW_CLIENT'
export const viewClient = formData => {
  return {
    type: VIEW_CLIENT,
    formData
  }
}
