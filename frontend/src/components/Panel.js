import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PageNotFound from '../components/PageNotFound'
import PostsList from '../components/PostsList';

const Panel = function (props) {
  if (props.categoryParam && !props.categories[props.categoryParam]) {
    return (
      <div>
        <PageNotFound />
      </div>
    )
  }
  return (
    <div className = "container">
      <div className="row">
        <div className="col-12">
          <div className = "Titulo">{props.title}</div>
          <PostsList category={props.categoryParam} />
        </div>
      </div>
    </div>
  );
}

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  categoryParam: PropTypes.string
}

function mapStateToProps({ categories }) {
  return {
    categories
  }
}

export default connect(
  mapStateToProps
)(Panel)
