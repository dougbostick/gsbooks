import axios from 'axios';

//const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

export default function (state = [], action) {
    if(action.type === 'LOAD_AUTHORS') {
        return action.authors;
    }
    return state
  }

  export const loadAuthors = () => {
    return async(dispatch) => {
        const response = await axios.get('/api/author');
        dispatch({type: "LOAD_AUTHORS", authors: response.data});
    };
};