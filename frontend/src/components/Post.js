import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PLUS_VOTE , MINUS_VOTE} from '../utils/appHelper';
import { getPostAPI , deletePostAPI , updatePostVoteAPI} from '../actions/posts';
import moment from 'moment';

class Post extends React.Component {
  componentDidMount() {
    this.postId = this.props.match.params.postId;
    this.props.getPost(this.postId);
  }
    state = {
      post: {}
    }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.posts) {
      console.log("nextProps",nextProps)
      let posts = nextProps.posts;
      console.log("posts",posts)
      if (posts && posts[this.postId]) {
        let post = Object.assign({}, posts[this.postId]);
        console.log("post",post)
        this.setState({ post });
      }
    }
  }

  render() {
    
    const { post } = this.state;
    console.log("props",this.state)
    console.log("props",this.props)
    return (
      <div>
      <button onClick={() => this.props.vote(post.id, PLUS_VOTE)} ></button>
      <button onClick={() => this.props.vote(post.id, MINUS_VOTE)} ></button>
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
            {/* CommentsList
            ComentADD */}
      </div>
    );
  }

}


function mapStateToProps({ posts }) {
  console.log("mapStateToProps",posts)
  return {
    posts
  }
}

/* function mapStateToProps(state, props) {
  const { id } = props.match.params;

  let post =
    state.posts.posts !== undefined
      ? state.posts.posts.find(post => post.id === id)
      : {};
  return {
    post,
  };
} */

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