import React from 'react';
import { connect } from 'react-redux';
import { Link , Redirect } from 'react-router-dom';
import { PLUS_VOTE , MINUS_VOTE} from '../utils/appHelper';
import { getPostAPI , deletePostAPI , updatePostVoteAPI , getPostsAPI} from '../actions/posts';
import moment from 'moment';
import CommentsList from './CommentsList';
import CommentForm from './CommentForm';
import PageNotFound from './PageNotFound'

class Post extends React.Component {
  constructor(props) {
  super(props);
  this.postId = this.props.match.params.postId;
  this.props.getPost(this.postId);
  
  this.state = {
    post: {},
    error:false,
    toHome:false
  }
} 

  componentWillReceiveProps(nextProps) {
    if (nextProps.posts) {
      let posts = nextProps.posts;
      if (posts && posts[this.postId]) {
        let post = Object.assign({}, posts[this.postId]);
        this.setState({ post });
      }else{
        this.setState({ error:true });
      }
    }
  }

  deletePost(id) {
    this.props.deletePost(id);
    this.setState(() => ({
      toHome: true
    }))
  }

  render() {
    const { post , error , toHome } = this.state;

    if (toHome) {
      return <Redirect to='/' />
    }

    if (error) {
      return (
        <PageNotFound />  
      )
    }

    return (
      <div className ="container">
        <div className="row">
          <div className="btn__score col-12 toolsPost">
            <span>Points score: </span>
            <i onClick={() => this.props.vote(post.id, PLUS_VOTE)}  className="fas fa-plus-circle"></i>
            <i onClick={() => this.props.vote(post.id, MINUS_VOTE)}  className="fas fa-minus-circle"></i>
            <Link to={"/post/" + post.id}>
              <span className="btn btn-outline-primary edit" ><i className="far fa-edit"></i> Edit</span>
            </Link>
            <span className = "btn btn-outline-danger deletePost" onClick={() => this.deletePost(post.id)}><i className="far fa-trash-alt"></i> Delete</span>
          </div>
        </div>
        <div className="card__post">
          <div>
            <label></label>
            <span>{post.category}</span>
          </div>
          <div>
            <label></label>
            <span><b>{post.title}</b> <i>by {post.author}</i></span>
          </div>
          <div>
            <label><b></b></label>
            <span><br />{post.body}</span>
          </div>
          <br />
          <div>
            <label><i>Posted at :</i></label>
            <span>{moment(post.timestamp).format("DD/MM/YY HH:mm")}</span>
          </div>
          <div>
            <label><b>Vote score: </b></label>
            <span className="badge badge-pill badge-info">{post.voteScore}</span>
          </div>
         
        </div>
          <CommentsList postId={this.postId} />
          <CommentForm  postId={this.postId} />
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: (id) => dispatch(getPostAPI(id)),
    vote: (id, vote) => dispatch(updatePostVoteAPI(id, vote)),
    deletePost: (id) => dispatch(deletePostAPI(id)),
    getPosts: () => dispatch(getPostsAPI()),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)