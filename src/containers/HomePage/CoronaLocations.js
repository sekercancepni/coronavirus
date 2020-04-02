import React from 'react';

import LocationCard from 'components/LocationCard';

import './style.scss';

const CoronaLocations = ({ locations, setSelectedLocation, filterData, onChangeShownCaseDetails }) => {
  const locationCards = locations.map((item, key) => (
    <LocationCard
      key={key}
      onClick={setSelectedLocation}
      locationInfo={item}
      onChangeShownCaseDetails={onChangeShownCaseDetails}
    />
  ));

  return (
    <div className="location-area-wrapper">
      <input
        className="filter-input"
        onChange={filterData}
        placeholder="Search Country"
      />
      <div className="location-area-container">
        {locationCards}
      </div>
    </div>
  )
};

export default CoronaLocations;
