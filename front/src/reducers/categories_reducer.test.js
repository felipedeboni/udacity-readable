import reducer from './categories_reducer';
import * as Actions from 'actions/category';

describe('category reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual([]);
  });

  it('should handle FETCH_CATEGORIES_SUCCESS', () => {
    const { categories } = global.mock;

    const successAction = {
      type: Actions.FETCH_CATEGORIES_SUCCESS,
      payload: {
        data: {
          categories
        }
      }
    };

    expect(reducer({}, successAction)).toEqual(categories);
  });
});
