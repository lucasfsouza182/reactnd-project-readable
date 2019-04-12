import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import PostsList from '../components/PostsList';

const Panel = function (props) {
  return (
    <div className = "grid">
      <div className="row">
        <div className="col12">
          <div className = "Titulo">{props.title}</div>
          <PostsList category={props.categoryName} />
          <Link to="/post-editor">
            <button className="primary">Add a new post</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  categoryName: PropTypes.string
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

export default connect(
  mapStateToProps
)(Panel)
