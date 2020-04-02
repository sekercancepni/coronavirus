import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Loader = ({ loaderIcon }) => (
  <div className="loading-container">
    <img src={loaderIcon} alt="loader" />
  </div>
)

Loader.propTypes = {
  loaderIcon: PropTypes.string,
};

Loader.defaultProps = {
  loaderIcon: '',
};

export default Loader;
