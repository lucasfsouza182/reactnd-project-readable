import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addCommentAPI , updateCommentAPI } from '../actions/comments';
import { FormErrors } from './FormErrors';
import moment from 'moment';
import uuid from 'uuid';

const ADD = "ADD";
const EDIT = "EDIT";
class CommentForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page : this.props.comment ? EDIT : ADD,
      comment: {
        id : this.props.comment ? this.props.comment.id : "",
        timestamp: this.props.comment ? this.props.comment.timestamp : "",
        parentId: this.props.comment ? this.props.comment.parentId : props.postId,
        author: this.props.comment ? this.props.comment.author : "",
        body: this.props.comment ? this.props.comment.body : ""
      },
      formErrors: {author: '' , body: ''},
      authorValid: false,
      bodyValid: false,
      formValid: false,
      toPost: false
    }
  }

  static propTypes = {
    postId: PropTypes.string.isRequired
  }

  handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(prevState => ({
      comment: {
          ...prevState.comment,
          [name]: value
      }
    }),() => { this.validateField(name, value) })
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let authorValid = this.state.comment.author;
    let bodyValid = this.state.comment.body;

    switch(fieldName) {
      case 'author':
        authorValid = value.length > 0;
        fieldValidationErrors.author = authorValid ? '': ' is empty';
        break;
      case 'body':
        bodyValid = value.length > 0;
        fieldValidationErrors.body = bodyValid ? '': ' is empty';
        break;  
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    authorValid: authorValid,
                    bodyValid: bodyValid,
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.authorValid && this.state.bodyValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  handleSubmit = (e) => {
    console.log("STATE",this.state.comment)
    if(this.state.page === ADD){
      let author = this.state.comment.author;
      let body = this.state.comment.body;
      
      let comment = {
        id : '',
        author: '',
        body: '',
        timestamp: '',
        parentId : ''
      };
  
      if (author) {
        comment.author = author;
      }
  
      if (body) {
        comment.body = body;
      }
      comment.id = uuid.v1();
      comment.timestamp = moment().valueOf();
      comment.parentId = this.state.comment.parentId;

      console.log("handleSubmit",comment)
      
      this.props.addComment(comment);
    }else{
      console.log("STATE",this.state.comment)
      this.props.updateComment(this.state.comment);
    }    
  }

  render() {
    return (
      <div>
        <h3>{this.state.page === ADD ? "Add a new " : "Edit a " } comment</h3>
        <form onSubmit={this.handleSubmit}>
            <div className="panel panel-default">
               <FormErrors formErrors={this.state.formErrors} />
            </div>
            <div className={`form-group ${this.errorClass(this.state.formErrors.author)}`}>
              <label htmlFor="author">Author</label>
              <input type="text" required className="form-control" name="author"
                placeholder="Author"
                value={this.state.comment.author}
                onChange={(event) => this.handleInput(event)} onBlur={(event) => this.handleInput(event)}/>
            </div>  
            <div className={`form-group ${this.errorClass(this.state.formErrors.body)}`}>
              <label htmlFor="body">Body</label>
              <textarea required className="form-control" name="body"
                placeholder="Body"
                value={this.state.comment.body} 
                onChange={(event) => this.handleInput(event)}  onBlur={(event) => this.handleInput(event)}/>
            </div>
          <br />
          <button className="btn btn-primary" type='submit' disabled={!this.state.formValid} >Save</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps({ comments }) {
  return {
    comments
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: (comment) => dispatch(addCommentAPI(comment)),
    updateComment: (comment) => dispatch(updateCommentAPI(comment)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm)