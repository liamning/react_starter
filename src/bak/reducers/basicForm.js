const basicForm = (state = {}, action) => {
  switch (action.type) {
    case 'VIEW_FORM':
      return {
        ...state, ...action.formData
      } 
    default:
      return state
  }
}

export default basicForm
