export const FETCH_CATEGORIES = 'FETCH_CATEGORIES';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAIL = 'FETCH_CATEGORIES_FAIL';

export const fetchCategories = () => {
  return {
    type: FETCH_CATEGORIES,
    payload: {
      request: {
        url: '/categories'
      }
    }
  };
};
