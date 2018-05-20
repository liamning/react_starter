const clientForm = (state = {}, action) => {
  switch (action.type) {
    case 'VIEW_CLIENT': 
      return {
        ...action.formData
      } 
    default:
      return state
  }
}

export default clientForm
