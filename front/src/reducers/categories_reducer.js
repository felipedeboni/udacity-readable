import * as Actions from 'actions/category';

const categories = (state = [], action) => {
  switch (action.type) {
    case Actions.FETCH_CATEGORIES_SUCCESS:
      return action.payload.data.categories;
    default:
      return state;
  }
};

export default categories;
