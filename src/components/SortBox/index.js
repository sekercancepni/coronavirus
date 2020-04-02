import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const SortBox = ({ onClick, title }) => (
  <div className="sorting-box" onClick={onClick}>{title}</div>
)

SortBox.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};

SortBox.defaultProps = {
  title: '',
  onClick: () => {},
};

export default SortBox;
