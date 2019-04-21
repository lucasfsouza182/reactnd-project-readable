import { GET_POSTS, DELETE_POST , VOTE_POST , SET_POST } from '../actions/actionTypes';
import { PLUS_VOTE } from '../utils/appHelper'


function posts(state = {}, action) {
  let posts = null;
  
  switch (action.type) {
    case GET_POSTS:
      if(state.undefined){
        delete state.undefined
      }
      return {
        ...state ,
        ...action.posts.reduce(function (myArray, post) {
            myArray[post.id] = post;
          return myArray;
        }, {})
      };
    case DELETE_POST:
      posts = Object.assign({}, state);
      delete posts[action.id];

      return posts;
    case VOTE_POST:
      posts = Object.assign({}, state);

      let post = posts[action.id];
      post.voteScore += action.vote === PLUS_VOTE ? 1 : -1;

      return {
        ...state,
        [action.id]: {
            ...post
        }
      }
    case SET_POST:
      return {
        ...state,
        [action.post.id]: {
            ...action.post
        }
      }
    default:
      return state;
  }
}

export default posts