import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPostsAPI , deletePostAPI} from '../actions/posts';
import { sortByField } from '../utils/appHelper';


const sort_by_vote = {
  type : "voteScore",
  value : "Vote"
}

const sort_by_timestamp = {
  type : "timestamp",
  value : "Date"
}

class PostsList extends React.Component {
  static propTypes = {
    category: PropTypes.string
  }
    state = {
      posts: [],
      postsSorted: sort_by_vote.type
    }
  componentDidMount() {
    this.props.getPosts();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.posts) {
      this.setState({ posts: sortByField(Object.values(nextProps.posts), sort_by_vote.type) });
    }
  }

  deletePost(id) {
    this.props.deletePost(id);
  }

  updateSort(field) {
    this.setState({
      postsSorted: field,
      posts: sortByField(this.state.posts, field)
    });
  }

  render() {
    let posts = [];
    if (this.state.posts) {
      posts = this.state.posts;
      const category = this.props.category;

      if (category) {
        posts = posts.filter(post => post.category === category);
      }
    }
    return (
        <div>
        <div>
          <select className="select" value={this.state.postsSort} onChange={(event) => this.updateSort(event.target.value)}>
            <option value={sort_by_vote.type}>{sort_by_vote.value}</option>
            <option value={sort_by_timestamp.type}>{sort_by_timestamp.value}</option>
          </select>
        </div>
        <div>
          {posts.map((post, idx) => {
            return (
              <div key={idx}>
                <div>
                  <div to={"/" + post.category + "/" + post.id}>{post.title}</div> - {post.author}
                </div>
                <div>
                  Score
                </div>
                <div>
                  {post.voteScore}
                </div>
                <div>
                  <button  className="plusVote"></button>
                </div>
                <div>
                  <button  className="minusVote"></button>
                </div>
                <div>
                  Comments
                </div>
                <div>
                  {post.commentCount}
                </div>
                <div>
                  <Link to={"/post/" + post.id}>
                    <button className="primary edit">Edit</button>
                  </Link>
                </div>
                <div>
                  <button className = "deletePost" onClick={() => this.deletePost(post.id)}>Delete</button>
                </div>
              </div>
            )
          })}
        </div>
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
    getPosts: () => dispatch(getPostsAPI()),
    deletePost: (id) => dispatch(deletePostAPI(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList)