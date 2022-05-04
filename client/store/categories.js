import axios from 'axios';

//const LOAD_CATEGORIES = 'LOAD_CATEGORIES';

export default function (state = [], action) {
    if(action.type === 'LOAD_CATEGORIES') {
        return action.categories;
    }
    return state
  }

  export const loadCategories = () => {
    return async(dispatch) => {
        const response = await axios.get('/api/categories');
        dispatch({type: "LOAD_CATEGORIES", categories: response.data});
    };
};