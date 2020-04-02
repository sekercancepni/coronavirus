import React, { Component } from 'react';

import './style.scss';

const DetailItem = ({ title, count }) => (
  <div className="case-detail">
    <span className="case-detail__title">{title}: </span>
    <span className="case-detail__count">{count}</span>
  </div>
);

class LocationCaseDetails extends Component {
  render() {
    const { selectedLocationCaseDetails, selectedLocationHistory } = this.props;
    const { country, cases, deaths, recovered, active, critical, countryInfo: { flag } } = selectedLocationCaseDetails;
    const { timeline } = selectedLocationHistory;
    const renderCaseHistory = timeline && timeline.cases && Object.keys(timeline.cases).map(item => (
      <div className="table-row" key={item}>
        <div className="table-col">{item}</div>
        {' '}
        <div className="table-col">{timeline.cases[item]}</div>
      </div>
    ))
    const renderDeathsHistory = timeline && timeline.deaths && Object.keys(timeline.deaths).map(item => (
      <div className="table-row" key={item}>
        <div className="table-col">{item}</div>
        {' '}
        <div className="table-col">{timeline.deaths[item]}</div>
      </div>
    ))

    return (
      <div className="case-details-wrapper">
        <div className="country-name">
          <img src={flag} />
          <span>{country}</span>
        </div>
        <div className="case-detail-container">
          <DetailItem title="Cases" count={cases} />
          <DetailItem title="Deaths" count={deaths} />
          <DetailItem title="Recovered" count={recovered} />
          <DetailItem title="Active" count={active} />
          <DetailItem title="Critical" count={critical} />
        </div>
        <div className="case-details-history">
          <div className="case-details-history__container">
            <div className="case-details-history__title">Deaths History</div>
            <div className="case-details-history__table">
              <div className="table-title">
                <div className="table-title__item">Date</div>
                <div className="table-title__item">Deaths Counts</div>
              </div>
              {renderDeathsHistory}
            </div>
          </div>
          <div className="case-details-history__container">
            <div className="case-details-history__title">Cases History</div>
            <div className="case-details-history__table">
              <div className="table-title">
                <div className="table-title__item">Date</div>
                <div className="table-title__item">Cases Counts</div>
              </div>
              {renderCaseHistory}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LocationCaseDetails;
