import React from 'react';
import { connect } from 'react-redux';
import { getPostAPI, addPostAPI, updatePostAPI } from '../actions/posts';
import { FormErrors } from './FormErrors';
import moment from 'moment';
import uuid from 'uuid';
import { Redirect } from 'react-router-dom'

const ADD = "ADD";
const EDIT = "EDIT";

class PostForm extends React.Component {
  componentDidMount() {
    if (this.props.match.params.postId !== undefined) {
      this.postId = this.props.match.params.postId;
      this.props.getPost(this.postId);
    }
  }
  
  state = {
    post: {
      title: "",
      author: "",
      category: "",
      body: ""
    },
    page : ADD,
    formErrors: {title: '', author: '' , category: '' , body: ''},
    titleValid: false,
    authorValid: false,
    categoryValid: false,
    bodyValid: false,
    formValid: false,
    toHome: false
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.posts) {
      return;
    }

    let posts = nextProps.posts;

    if (posts && posts[this.postId]) {
      let post = posts[this.postId];
      this.setState({ page: EDIT,
                      post: post,
                      category: post.category,});
    }
  }

  handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(prevState => ({
      post: {
          ...prevState.post,
          [name]: value
      }
    }),() => { this.validateField(name, value) })
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let titleValid = this.state.post.title;
    let authorValid = this.state.post.author;
    let categoryValid = this.state.post.category;
    let bodyValid = this.state.post.body;

    switch(fieldName) {
      case 'title':
        titleValid = value.length > 0;
        fieldValidationErrors.title = titleValid ? '' : ' is empty';
        break;
      case 'author':
        authorValid = value.length > 0;
        fieldValidationErrors.author = authorValid ? '': ' is empty';
        break;
      case 'category':
        categoryValid = value.length > 0;
        fieldValidationErrors.category = categoryValid ? '': ' is empty';
        break;
      case 'body':
        bodyValid = value.length > 0;
        fieldValidationErrors.body = bodyValid ? '': ' is empty';
        break;  
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    titleValid: titleValid,
                    authorValid: authorValid,
                    categoryValid: categoryValid,
                    bodyValid: bodyValid,
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.titleValid && this.state.authorValid && this.state.categoryValid && this.state.bodyValid});
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }

  handleSubmit = (e) => {
    if(this.state.page === ADD){
      let title = this.state.post.title;
      let category = this.state.post.category;
      let author = this.state.post.author;
      let body = this.state.post.body;
      
      let post = {
        id : '',
        title: '',
        author: '',
        category: '',
        body: '',
      };
  
      if (title) {
        post.title = title;
      }
  
      if (author) {
        post.author = author;
      }
  
      if (category) {
        post.category = category;
      }
  
      if (body) {
        post.body = body;
      }
      post.id = uuid.v1();
      post.timestamp = moment().valueOf();
  
      this.props.addPost(post);
    }else{
      this.props.updatePost(this.state.post);
    }

    this.setState(() => ({
      toHome: true
    }))
  }

  render() {    
    if (this.state.toHome === true) {
      return <Redirect to='/' />
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-12">
            Post form
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <form onSubmit={this.handleSubmit}>
              <div className="panel panel-default">
                <FormErrors formErrors={this.state.formErrors} />
              </div>
              <div className={`form-group ${this.errorClass(this.state.formErrors.title)}`}>
                <label htmlFor="title">Title</label>
                <input type="text" required className="form-control" name="title"
                  placeholder="Title"
                  value={this.state.post.title}
                  onChange={(event) => this.handleInput(event)} onBlur={(event) => this.handleInput(event)}/>
              </div>
              {this.state.page === EDIT && 
                <div className="form-group">
                <label htmlFor="date">Date</label>
                <input type="text" className="form-control" name="date" value={moment(this.state.post.timestamp).format("DD/MM/YY HH:mm")} readOnly/>
              </div>
              }
              
              <div className={`form-group ${this.errorClass(this.state.formErrors.author)}`}>
                <label htmlFor="author">Author</label>
                <input type="text" required className="form-control" name="author"
                  placeholder="Author"
                  value={this.state.post.author}
                  onChange={(event) => this.handleInput(event)}   onBlur={(event) => this.handleInput(event)}/>
              </div>
              <div className={`form-group ${this.errorClass(this.state.formErrors.category)}`}>
                <label htmlFor="title">Category</label>
                <select className="form-control" required placeholder="Category" name="category" value={this.state.category}  onChange={this.handleInput} onBlur={(event) => this.handleInput(event)}>
                    <option>Select category</option>
                    {this.props.categories && Object.values(this.props.categories).map((category, id) => {
                      return (<option value={category.name} key={id}>{category.name}</option>)
                    }
                    )}
                  </select>
              </div>
              <div className={`form-group ${this.errorClass(this.state.formErrors.body)}`}>
                <label htmlFor="body">Body</label>
                <textarea  required className="form-control" name="body"
                  placeholder="Body"
                  value={this.state.post.body} 
                  onChange={(event) => this.handleInput(event)}  onBlur={(event) => this.handleInput(event)}/>
              </div>
              <br />
              <button className="btn btn-primary" type='submit' disabled={!this.state.formValid}>Save</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps({ categories, posts }) {
  return {
    categories,
    posts
  }
}

function mapDispatchToProps(dispatch) {
  return {
    getPost: (id) => dispatch(getPostAPI(id)),
    addPost: (post) => dispatch(addPostAPI(post)),
    updatePost: (post) => dispatch(updatePostAPI(post))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostForm);
