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

  /* constructor(props) {
    super(props);
    this.props.getComments(this.props.postId);

    this.state = {
      comments: [],
      commentsSorted: sort_by_vote.type,
      showEdit : {
        isHidden: true,
        commentId : ''
      }
    }
  } */

  static propTypes = {
    postId: PropTypes.string.isRequired
  }

  /* componentWillReceiveProps(nextProps) {
    if (nextProps.comments) {
      let comments = [];
      if (nextProps.comments[this.props.postId] !== undefined) {
        comments = sortByField(nextProps.comments[this.props.postId], sort_by_vote.type);
        this.setState({ comments });
      }
    }
  } */

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
    const { comments } = this.props;
    return (
      <div>
        <h3>Comments : {comments.length}</h3> 
        <br />
        <div>
          <select className="select" value={this.state.commentsSorted} onChange={(event) => this.changeSort(event.target.value)}>
            <option value={sort_by_vote.type}>{sort_by_vote.value}</option>
            <option value={sort_by_timestamp.type}>{sort_by_timestamp.value}</option>
          </select>
        </div>
        <div>
          <ul>
            {comments && comments.map((comment, id) => (
              <li className="comment" key={id}>
                <div>
                  Date {moment(comment.timestamp).format("DD/MM/YY HH:mm")}
                </div>
                <div>
                author {comment.author}
                </div>
                <div>
                  Score
                  &nbsp;
                  {comment.voteScore}
                  &nbsp;
                  <button onClick={() => this.props.vote(this.props.postId, comment.id, PLUS_VOTE)} >PLUS_VOTE</button>
                  &nbsp;
                  <button onClick={() => this.props.vote(this.props.postId, comment.id, MINUS_VOTE)} >MINUS_VOTE</button>
                </div>
                <div>
                  <span className="body">{comment.body}</span>
                </div>
                <div>
                  <button className="edit-comment" onClick={this.toggleHidden.bind(this ,comment.id)}>Edit</button>
                  &nbsp; 
                  <button className="delete-comment" onClick={() => this.props.deleteComment(this.props.postId, comment.id)}>Delete</button>
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
  const { postId } = props
  let commentsArr =[]
  if (comments[postId] !== undefined) {
    commentsArr = sortByField(comments[postId], sort_by_vote.type);
  }
  console.log("mapStateToProps commentsArr", commentsArr)
  return {
    comments : commentsArr
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