const CLEAR_SELECTED_IDEA = 'CLEAR_SELECTED_IDEA';
const SET_MINION = 'SET_MINION';



const initial = {
  id: '',
  name: '',
  age: '',
  salary: '',
  weaknesses: '',
}

module.exports = (initialState = initial, action) => {
  switch(action.type) {
    case CLEAR_SELECTED_IDEA:
      return {};
      case SET_MINION:
        return action.minion;
        default:
          return initialState;
        }
      }
      
const setSelectedMinion = minion => {
  return {
    type: SET_MINION,
    minion
  }
}
      
module.exports = { setSelectedMinion };