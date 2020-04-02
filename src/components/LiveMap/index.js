import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import PropTypes from 'prop-types';

import { GOOGLE_API } from 'config';

import mapOptions from './mapOptions';
import './style.scss';

const CenterMapPin = ({ isSelected, id, location, onChangeShownCaseDetails }) => {
  const { country, deaths, cases } = location;
  const pinElementId = document.getElementById(id);

  if(pinElementId) {
    pinElementId.parentElement.style.zIndex = isSelected ? 2 : 'inherit';
  }

  return (
    <div
      id={id}
      className={`marker-container ${isSelected ? 'selected-marker' : ''}`}
      onClick={e => onChangeShownCaseDetails(e, location)}
    >
      <div>{country}</div>
      <div>{cases} Cases</div>
      <div>{deaths} Deaths</div>
    </div>
  );
}

class LiveMap extends Component {
  renderGooglePins = () => {
    const { locations, selectedLocation, onChangeShownCaseDetails } = this.props;

    const pins = locations.map((location, id) => ({
      lat: Number(location.countryInfo.lat),
      lng: Number(location.countryInfo.long),
      location: location,
      isSelected: selectedLocation.countryInfo._id === location.countryInfo._id,
      id,
    }));

    return pins.map(pin => (
      <CenterMapPin
        key={pin.id}
        onChangeShownCaseDetails={onChangeShownCaseDetails}
        {...pin}
      />
    ));
  };

  render() {
    const { zoom, center } = this.props;

    return (
      <div className="map-container">
        <GoogleMap
          bootstrapURLKeys={{
            key: GOOGLE_API,
            language: 'en',
          }}
          defaultZoom={zoom}
          center={center}
          options={mapOptions}
        >
          {this.renderGooglePins()}
        </GoogleMap>
      </div>
    );
  }
}

LiveMap.propTypes = {
  zoom: PropTypes.number,
  center: PropTypes.object,
};

LiveMap.defaultProps = {
  zoom: 14,
};

export default LiveMap;
