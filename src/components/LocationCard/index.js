import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const LocationCard = props => {
  const { locationInfo, onClick, onChangeShownCaseDetails } = props;
  const { country, countryInfo, cases, deaths } = Object.keys(locationInfo).length && locationInfo;

  return (
    <div className="location-card" onClick={() => onClick(locationInfo)}>
      <div className="location-card__country">
        <img className="location-flag" src={countryInfo.flag} />
        <div className="location-card__content">
          <p className="country-name">{country}</p>
          <span className="confirmed-patient-count">{cases} Cases - </span>
          <span className="confirmed-patient-count">{deaths} Deaths</span>
          {/*
            <p className="death-count">Death: {deathCount}</p>
            <p className="recovered-patient-count">Recovered: {recoveredCount}</p>
          */}
        </div>
      </div>
      <button onClick={e => onChangeShownCaseDetails(e, locationInfo)}>See Details</button>
    </div>
  );
};

LocationCard.propTypes = {
  locationInfo: PropTypes.object,
  onClick: PropTypes.func,
  onChangeShownCaseDetails: PropTypes.func,
};

LocationCard.defaultProps = {
  locationInfo: {},
  onClick: () => {},
  onChangeShownCaseDetails: () => {},
};

export default LocationCard;
