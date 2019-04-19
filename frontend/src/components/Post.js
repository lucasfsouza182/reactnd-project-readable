import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PLUS_VOTE , MINUS_VOTE} from '../utils/appHelper';
import { getPostAPI , deletePostAPI , updatePostVoteAPI} from '../actions/posts';
import moment from 'moment';
import CommentsList from '../components/CommentsList';
import CommentForm from './CommentForm';
import PageNotFound from '../components/PageNotFound'
import { FaAngleDoubleUp , FaAngleDoubleDown} from "react-icons/lib/fa" 


class Post extends React.Component {
  // componentDidMount() {
  //   this.postId = this.props.match.params.postId;
  //   this.props.getPost(this.postId);
  // }
  //   state = {
  //     post: {}
  //   }
    constructor(props) {
      super(props);
  
      this.postId = this.props.match.params.postId;
      this.props.getPost(this.postId);
  
      this.state = {
        post: {},
        error:false
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

  render() {
    const { post , error } = this.state;
    if (error) {
      return (
        <PageNotFound />  
      )
    }

    return (
      <div>
      <button onClick={() => this.props.vote(post.id, PLUS_VOTE)} ><FaAngleDoubleUp className='vote-icon' /></button>
      <button onClick={() => this.props.vote(post.id, MINUS_VOTE)} ><FaAngleDoubleDown className='vote-icon' /></button>
        <div>
          <div>
            <label><b>Date</b></label>
            <span>{moment(post.timestamp).format("DD/MM/YY HH:mm")}</span>
          </div>
          <div>
            <label><b>Vote score</b></label>
            <span>{post.voteScore}</span>
          </div>
          <div>
            <label><b>Title</b></label>
            <span>{post.title}</span>
          </div>
          <div>
            <label><b>Author</b></label>
            <span> {post.author}</span>
          </div>
          <div>
            <label><b>Category</b></label>
            <span>{post.category}</span>
          </div>
          <div>
            <label><b>Body</b></label>
            <span> <br /><br />{post.body}</span>
          </div>
        </div>
            <Link to={"/post/" + post.id}>
              <button className="primary edit">Edit</button>
            </Link>
            <button className = "deletePost" onClick={() => this.deletePost(post.id)}>Delete</button>
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
    deletePost: (id) => dispatch(deletePostAPI(id))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post)