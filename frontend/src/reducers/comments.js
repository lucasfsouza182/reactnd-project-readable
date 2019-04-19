import { GET_COMMENTS, ADD_COMMENT, UPDATE_COMMENT, DELETE_COMMENT, VOTE_COMMENT } from '../actions/actionTypes';
import { PLUS_VOTE } from '../utils/appHelper'

function comments(state = {}, action) {
  let postComments = null;
  
  switch (action.type) {
    case GET_COMMENTS:
      return Object.assign({}, state, {
        [action.postId]: action.comments
      });
    case ADD_COMMENT:
      postComments = [];

      if (state[action.comment.parentId] !== undefined) {
        postComments = state[action.comment.parentId];
      }

      return Object.assign({}, state, {
        [action.comment.parentId]: postComments.concat(action.comment)
      });
    case UPDATE_COMMENT:
      postComments = [].concat(state[action.comment.parentId]);
      let commentId = postComments.findIndex(postComment => postComment.id === action.comment.id);

      postComments[commentId] = action.comment;

      return Object.assign({}, state, {
        [action.comment.parentId]: postComments
      });
    case DELETE_COMMENT:
      postComments = state[action.postId];
      postComments = postComments.filter(comment => comment.id !== action.id);

      return Object.assign({}, state, {
        [action.postId]: postComments
      });
    case VOTE_COMMENT:
      postComments = state[action.postId];

      postComments.map(comment => {
        if(comment.id === action.id) {
          comment.voteScore += action.vote === PLUS_VOTE ? 1 : -1;
        }

        return comment;
      });      

      return Object.assign({}, state, {
        [action.postId]: postComments
      });
    default:
      return state;
  }
}

export default comments