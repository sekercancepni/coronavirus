import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const TotalBox = ({ title, count, className }) => (
  <div className={`total-info ${className}`}>
    <div className="total-info__text">{title}</div>
    <div className="total-info__count">{count}</div>
  </div>
)

TotalBox.propTypes = {
  title: PropTypes.string,
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
};

TotalBox.defaultProps = {
  title: '',
  count: 0,
  className: '',
};

export default TotalBox;
