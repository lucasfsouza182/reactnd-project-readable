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
    if (this.props.posts && this.props.posts !== undefined) {
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
        <div className="more__post">
          <Link to="/post">
            <button className="btn btn-outline-success">New Post <i className="fas fa-plus"></i></button>
          </Link>
        </div>
        <div className="row">
          {posts.map((post) => {
            return (
              <div className="col-md-6 col-12" key={post.id}>
                <div className="container-fluid card__post">

                  <h1 className="card__author"><Link to={"/" + post.category + "/" + post.id}>{post.title}</Link> <br /><span>Author: <span className="author__name">{post.author}</span></span></h1>

                  <span className="tools">Tools</span>
                  <div className="card__tools">

                    <div className="btn__score">
                      <span>Points score: </span>
                        <i onClick={() => this.props.vote(post.id, PLUS_VOTE)}  className="fas fa-plus-circle"></i>
                        <i onClick={() => this.props.vote(post.id, MINUS_VOTE)}  className="fas fa-minus-circle"></i>
                    </div>

                    <Link to={"/post/" + post.id}>
                      <span className="primary edit" ><i className="far fa-edit"></i> Edit</span>
                    </Link>

                    <span className = "deletePost" onClick={() => this.deletePost(post.id)}><i className="far fa-trash-alt"></i> Delete</span>

                  </div>

                  <div key={post.id} className="box__numbers">
                    <div>
                      Score: <span className="badge badge-pill badge-info">{post.voteScore}</span>
                    </div>
                    <div>
                      Comments: <span className="badge badge-pill badge-info">{post.commentCount}</span>
                    </div>
                  </div>
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