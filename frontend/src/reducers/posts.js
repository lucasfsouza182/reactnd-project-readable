import { GET_POSTS, DELETE_POST } from '../actions/actionTypes';


function posts(state = {}, action) {
  let posts = null;
  
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        ...action.posts.reduce(function (myArray, post) {
          myArray[post.id] = post;
          return myArray;
        }, {})
      };
    case DELETE_POST:
      posts = Object.assign({}, state);
      delete posts[action.id];

      return posts;
    default:
      return state;
  }
}

export default posts