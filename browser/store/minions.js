const axios = require('axios');

const { hashHistory } = require('react-router')
const { setSelectedMinion } = require ('./selectedMinion');

const SET_MINIONS = 'SET_MINIONS';
const CREATE_MINION = 'CREATE_MINION';
const UPDATE_MINION = 'UPDATE_MINION';

// Actions

const setMinions = minions => {
  return {
    type: SET_MINIONS,
    minions,
  }
}

const addMinion = minion => {
  return {
    type: CREATE_MINION,
    minion,
  }
}

const updateMinion = minion => {
  return {
    type: UPDATE_MINION,
    minion,
  }
}

// Thunks

const createMinionThunk = minion => dispatch => {
  axios.post('http://localhost:4001/api/minions', minion)
  .then(res => res.data)
  .then(createdMinion => {
    dispatch(addMinion(createdMinion));
    hashHistory.push(`/minions/${createdMinion.id}`);
  })
  .catch(console.error.bind(console));
}

const updateMinionThunk = minion => dispatch => {
  axios.put(`http://localhost:4001/api/minions/${minion.id}`, minion)
  .then(res => res.data)
  .then(updatedMinion => {
    dispatch(updateMinion(updatedMinion));
    dispatch(setSelectedMinion(updatedMinion));
  })
  .catch(console.error.bind(console));
}

const deleteMinionThunk = minionId => dispatch => {
  axios.delete(`http://localhost:4001/api/minions/${minionId}`)
  .then(res => res.data)
  .then(() => {
    return axios.get(`http://localhost:4001/api/minions`)
  })
  .then(res => res.data)
  .then(allMinions => {
    dispatch(setMinions(allMinions));
  })
  .catch(console.error.bind(console));
}

// Reducer

 const initial = [];

module.exports = (initialState = initial, action) => {
  switch(action.type) {
    case CREATE_MINION:
      return [...initialState, action.minion];
    case SET_MINIONS:
      return action.minions;
    case UPDATE_MINION:
      const index = initialState.findIndex(el => el.id === action.minion.id);
      if (index === -1) {
        return initialState;
      }
      return [...initialState.slice(0, index), action.minion, ...initialState.slice(index + 1)];
    default:
      return initialState;
  }
}

module.exports = {
  setMinions,
  addMinion,
  updateMinion,
  createMinionThunk,
  updateMinionThunk,
  deleteMinionThunk,
  initial

};
