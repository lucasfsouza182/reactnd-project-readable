import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getPostsAPI , deletePostAPI , updatePostVoteAPI} from '../actions/posts';
import { sortByField , PLUS_VOTE , MINUS_VOTE} from '../utils/appHelper';


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

  changeSort(field) {
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
          <select className="select" value={this.state.postsSort} onChange={(event) => this.changeSort(event.target.value)}>
            <option value={sort_by_vote.type}>{sort_by_vote.value}</option>
            <option value={sort_by_timestamp.type}>{sort_by_timestamp.value}</option>
          </select>
        </div>
        <div>
          {posts.map((post) => {
            return (
              <div key={post.id} className="List">
                <div>
                  <Link to={"/" + post.category + "/" + post.id}>{post.title}</Link> - {post.author}
                </div>
                <div>
                  Score
                </div>
                <div>
                  {post.voteScore}
                </div>
                <div>
                  <button onClick={() => this.props.vote(post.id, PLUS_VOTE)} className="plusVote">VOTE PLUS</button>
                </div>
                <div>
                  <button onClick={() => this.props.vote(post.id, MINUS_VOTE)} className="minusVote">VOTE MINUS</button>
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
    vote: (id, vote) => dispatch(updatePostVoteAPI(id, vote)),
    getPosts: () => dispatch(getPostsAPI()),
    deletePost: (id) => dispatch(deletePostAPI(id)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostsList)