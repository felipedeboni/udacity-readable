import { fetchCategories, FETCH_CATEGORIES_SUCCESS } from 'actions/category';
const { MockApi, store } = global;

it('dispatches FETCH_CATEGORIES_SUCCESS', () => {
  MockApi.onGet('/categories').reply(200, {
    categories: [
      {
        name: 'react',
        path: 'react'
      },
      {
        name: 'redux',
        path: 'redux'
      },
      {
        name: 'udacity',
        path: 'udacity'
      }
    ]
  });
  const expectedAction = { type: FETCH_CATEGORIES_SUCCESS };

  return store.dispatch(fetchCategories()).then(() => {
    expect(
      store.getActions().find(_ => _.type === expectedAction.type)
    ).toBeDefined();
  });
});
