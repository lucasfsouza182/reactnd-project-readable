import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPostsAPI , deletePostAPI , updatePostVoteAPI} from '../actions/posts';
import { sortByField , PLUS_VOTE , MINUS_VOTE} from '../utils/appHelper';
import { FaAngleDoubleUp , FaAngleDoubleDown , FaEdit , FaTrash} from "react-icons/lib/fa" 



const sort_by_vote = {
  type : "voteScore",
  value : "Vote"
}

const sort_by_timestamp = {
  type : "timestamp",
  value : "Date"
}

class PostsList extends React.Component {

  componentDidMount() {
    this.props.getPosts();
  }

  static propTypes = {
    category: PropTypes.string
  }
    state = {
      posts: [],
      postsSorted: sort_by_vote.type
    }
  

  /* componentWillReceiveProps(nextProps) {
    if (nextProps.posts) {
      this.setState({ posts: sortByField(Object.values(nextProps.posts), sort_by_vote.type) });
    }
  } */

  deletePost(id) {
    this.props.deletePost(id);
  }

  changeSort(field) {
    this.setState({
      postsSorted: field,
      posts: sortByField(this.props.posts, field)
    });
  }

  render() {
    let posts = [];
    if (this.props.posts) {
      posts = this.props.posts;
      const category = this.props.category;

      if (category) {
        posts = posts.filter(post => post.category === category);
      }
    }
    return (
        <div>
        <div className="form-group">
          <label htmlFor="order">Order</label>
          <select name="order" className="form-control" value={this.state.postsSort} onChange={(event) => this.changeSort(event.target.value)}>
            <option value={sort_by_vote.type}>{sort_by_vote.value}</option>
            <option value={sort_by_timestamp.type}>{sort_by_timestamp.value}</option>
          </select>
        </div>
        
          {posts.map((post) => {
            return (
              <div className="container-fluid">
              <div class="sidebar">
               <div>
                  <button onClick={() => this.props.vote(post.id, PLUS_VOTE)} className="plusVote"><FaAngleDoubleUp className='vote-icon' /></button>
                </div>
                <div>
                  <button onClick={() => this.props.vote(post.id, MINUS_VOTE)} className="minusVote"><FaAngleDoubleDown className='vote-icon' /></button>
                </div>
              </div>  
              <div key={post.id} className="content">
                <div>
                  <Link to={"/" + post.category + "/" + post.id}>{post.title}</Link> - {post.author}
                </div>
                <div>
                  Score <span className="badge badge-primary badge-pill">{post.voteScore}</span>
                </div>
                
                <div>
                  Comments
                  <span className="badge badge-primary badge-pill">{post.commentCount}</span>
                </div>
                <div>
                  <Link to={"/post/" + post.id}>
                    <button className="primary edit" ><FaEdit className='edit-icon' />Edit</button>
                  </Link>
                </div>
                <div>
                  <button className = "deletePost" onClick={() => this.deletePost(post.id)}><FaTrash className='delete-icon' />Delete</button>
                </div>
              </div>
              </div>
            )
          })}
        
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    posts : sortByField(Object.values(posts), sort_by_vote.type)
  }
}

function mapDispatchToProps(dispatch) {
  return {
    vote: (id, vote) => dispatch(updatePostVoteAPI(id, vote)),
    getPosts: () => dispatch(getPostsAPI()),
    deletePost: (id) => dispatch(deletePostAPI(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList)