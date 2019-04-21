import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PLUS_VOTE, MINUS_VOTE , sortByField} from '../utils/appHelper';
import { getCommentsAPI, deleteCommentAPI, updateCommentVoteAPI } from '../actions/comments'
import moment from 'moment';
import CommentForm from './CommentForm';

const sort_by_vote = {
  type : "voteScore",
  value : "Vote"
}

const sort_by_timestamp = {
  type : "timestamp",
  value : "Date"
}

class CommentsList extends React.Component {

  componentDidMount() {
    this.props.getComments(this.props.postId);
  }

  state = {
    comments: [],
    commentsSorted: sort_by_vote.type,
    showEdit : {
      isHidden: true,
      commentId : ''
    }
  }

  static propTypes = {
    postId: PropTypes.string.isRequired
  }

  //Using this to update the render method
  componentWillReceiveProps(nextProps) {
    if (nextProps.comments) {
      if (nextProps.comments[this.props.postId] !== undefined) {
       let comments = sortByField(nextProps.comments[this.props.postId], sort_by_vote.type);
        this.setState({ comments });
      }
    }
  } 

  changeSort(field) {
    this.setState({
      commentsSorted: field,
      comments: sortByField(this.state.comments, field)
    });
  }

  toggleHidden (id) {
    this.setState({
      showEdit : {isHidden: !this.state.showEdit.isHidden , commentId : id}
    })
  }

  render() {
    const { comments } = this.state;
    return (
      <div>
        <h3>Comments : {comments.length}</h3> 
        <br />
        <div>
          <span>Filter: </span>
          <select className="select" value={this.state.commentsSorted} onChange={(event) => this.changeSort(event.target.value)}>
            <option value={sort_by_vote.type}>{sort_by_vote.value}</option>
            <option value={sort_by_timestamp.type}>{sort_by_timestamp.value}</option>
          </select>
        </div>
        <div >
          <ul>
            {comments && comments.map((comment, id) => (
              <li className="comment" key={id}>
                <h2 className="card__author">
                  {comment.author}<span className="span__date"> - {moment(comment.timestamp).format("DD/MM/YY HH:mm")}</span>
                </h2>
                <div>
                  <span className="body">{comment.body}</span>
                </div>
                
                <span className="tools">Tools</span>
                <div className="card__tools">
                  <div className="point__score">
                    Point score: 
                    <span className="badge badge-pill badge-info">{comment.voteScore}</span>
                    <i onClick={() => this.props.vote(this.props.postId, comment.id, PLUS_VOTE)} className="fas fa-plus-circle"></i>
                    <i onClick={() => this.props.vote(this.props.postId, comment.id, MINUS_VOTE)}  className="fas fa-minus-circle"></i>
                  </div>
                  <span className="primary edit" onClick={this.toggleHidden.bind(this ,comment.id)}><i className="far fa-edit"></i> Edit</span>
                  <span className = "deletePost" onClick={() => this.props.deleteComment(this.props.postId, comment.id)}><i className="far fa-trash-alt"></i> Delete</span>
                </div>

                {!this.state.showEdit.isHidden && comment.id === this.state.showEdit.commentId 
                  && <CommentForm comment={comment} postId={this.props.postId}/>}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}


function mapStateToProps({ comments } , props) {
  /* const { postId } = props
  let commentsArr =[]
  if (comments[postId] !== undefined) {
    commentsArr = sortByField(comments[postId], sort_by_vote.type);
  }
  console.log("mapStateToProps commentsArr", commentsArr) */
  return {
    comments : comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getComments: (postId) => dispatch(getCommentsAPI(postId)),
    deleteComment: (postId, id) => dispatch(deleteCommentAPI(postId, id)),
    vote: (postId, id, vote) => dispatch(updateCommentVoteAPI(postId, id, vote))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentsList)