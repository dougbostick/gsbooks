import axios from 'axios';

const LOAD_USERS = 'LOAD_USERS';

// ** User Reducer ** //
export default function (state = [], action) {
    if(action.type === 'LOAD_USERS') {
        return action.users;
    }
    return state
}

export const loadUsers = () => {
  return async(dispatch) => {
      const response = await axios.get('/api/users');
      dispatch({type: LOAD_USERS, users: response.data});
  };
};