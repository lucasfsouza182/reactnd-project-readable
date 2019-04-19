import { GET_POSTS , SET_POST , UPDATE_POST , DELETE_POST , VOTE_POST} from '../actions/actionTypes';
import { getAllPosts , savePost , editPost , getPostsDetail , removePost , votePost } from '../utils/api'

 
  export function getPosts({ posts }) {
    return {
      type: GET_POSTS,
      posts
    }
  }
  
  export function setPost(post) {
    return {
      type: SET_POST,
      post
    }
  }
  
  export function updatePost(post) {
    return {
      type: UPDATE_POST,
      post
    }
  }
  
  export function deletePost(id) {
    return {
      type: DELETE_POST,
      id
    }
  }
  
  export function updatePostVote(id, vote) {
    return {
      type: VOTE_POST,
      id, 
      vote
    }
  }
  
  export function getPostsAPI() {
    return function (dispatch) {
      getAllPosts().then(posts => {
        dispatch(getPosts({ posts }));
      });
    }
  }
  
  export function addPostAPI(post) {
    return function (dispatch) {
      savePost(post).then((resPost) => {
        dispatch(setPost(resPost));
      })
    }
  }
  
  export function updatePostAPI(post) {
    return function (dispatch) {
      editPost(post).then((resPost) => {
        dispatch(updatePost(resPost));
      })
    }
  }
  
  export function getPostAPI(id) {
    return function (dispatch) {
      getPostsDetail(id).then((post) => {
        dispatch(setPost(post));
      })
    }
  }
  
  export function deletePostAPI(id) {
    return function (dispatch) {
      removePost(id).then(() => {
        dispatch(deletePost(id));
      })
    }
  }
  
  export function updatePostVoteAPI(id, vote) {
    return function (dispatch) {
      votePost(id, {option: vote}).then(() => {
        dispatch(updatePostVote(id, vote));
      })
    }
  }