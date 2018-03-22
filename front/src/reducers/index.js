import { combineReducers } from 'redux';
import categories from './categories_reducer';
import posts from './posts_reducer';
import comments from './comments_reducer';

export default combineReducers({
  categories,
  posts,
  comments
});
