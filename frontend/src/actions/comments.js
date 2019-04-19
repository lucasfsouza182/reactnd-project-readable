import { getCommentsByPostId , saveComment , editComment , deleteComment , voteComment } from '../utils/api';
import { GET_COMMENTS , ADD_COMMENT , UPDATE_COMMENT , DELETE_COMMENT , VOTE_COMMENT} from './actionTypes';

export function getComments({ postId, comments }) {
  return {
    type: GET_COMMENTS,
    postId,
    comments
  }
}

export function addComment({ comment }) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function updateComment({ comment }) {
  return {
    type: UPDATE_COMMENT,
    comment
  }
}

export function removeComment({ postId, id }) {
  return {
    type: DELETE_COMMENT,
    postId,
    id
  }
}

export function updatePostVote({postId, id, vote}) {
  return {
    type: VOTE_COMMENT,
    postId,
    id, 
    vote
  }
}

export function getCommentsAPI(postId) {
  return function (dispatch) {
    getCommentsByPostId(postId).then(comments => {
      dispatch(getComments({ postId, comments }));
    });
  }
}

export function addCommentAPI(comment) {
  return function (dispatch) {
    saveComment(comment).then(comment => {
      dispatch(addComment({ comment }));
    });
  }
}

export function updateCommentAPI(comment) {
  return function (dispatch) {
    editComment(comment).then(comment => {
      dispatch(updateComment({ comment }));
    });
  }
}

export function deleteCommentAPI(postId, id) {
  return function (dispatch) {
    deleteComment(id).then((res) => {
      dispatch(removeComment({ postId, id }));
    });
  }
}

export function updateCommentVoteAPI(postId, id, vote) {
  return function (dispatch) {
    voteComment(id, {option: vote}).then(() => {
      dispatch(updatePostVote({postId, id, vote}));
    })
  }
}
