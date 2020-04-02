import React, { Component } from 'react';

import Loading from 'images/loading.gif';

import { apiConfig } from 'config';

import LiveMap from 'components/LiveMap';
import TotalBox from 'components/TotalBox';
import SortBox from 'components/SortBox';
import Modal from 'components/Modal';
import Loader from 'components/Loader';

import LocationCaseDetails from './LocationCaseDetails';
import CoronaLocations from './CoronaLocations';
import './style.scss';

const { latestData, countries, historicalCountry, countriesSort } = apiConfig;

class HomePage extends Component {
  state = {
    locations: [],
    latestData: {},
    selectedLocation: {},
    filteredLocations: [],
    selectedLocationCaseDetails: {},
    selectedLocationHistory: {},
    isShownCaseDetails: false,
    isShownModalLoader: false,
    loading: true,
  }

  componentDidMount() {
    this.getLocations();
    this.getAllCases();
  }

  getAllCases = () => {
    fetch(latestData)
      .then(response => response.json())
      .catch( error =>
        console.log(error)
      ).then(response => {
        this.setState({
          latestData: response,
        })
      });
  };

  getLocations = () => {
    fetch(countries)
      .then(response => response.json())
      .catch( error =>
        console.log(error)
      ).then(response => {
        this.setState({
          locations: response,
          filteredLocations: response,
          selectedLocation: response[0],
          loading: false,
        })
      });
  };

  setSelectedLocation = selectedLocation => {
    this.setState({
      selectedLocation
    })
  };

  filterData = e => {
    const { value } = e.target;
    const { locations } = this.state;

    if (value.trim() === '') {
      this.setState({ filteredLocations: locations });
    } else {
      const filteredArray = locations.filter(location => 
        this.isContainsValue(location, value.trim().toLowerCase())
      );

      this.setState({ filteredLocations: filteredArray });
    }
  };

  isContainsValue = (locationItem, inputValue) => {
    let contains = false;

    Object.keys(locationItem).forEach((key) => {
      if (key === 'country') {
        const name = locationItem[key].toLowerCase();
        if (name.indexOf(inputValue) !== -1) {
          contains = true;
        }
      }
    })
    return contains;
  };

  sortCases = (sortingKey, event) => {
    const selectedSortingElement = document.getElementsByClassName('selected-sorting')[0];

    if(selectedSortingElement) {
      selectedSortingElement.classList.remove('selected-sorting');
    }

    event.currentTarget.classList.add('selected-sorting');

    fetch(countriesSort(sortingKey))
      .then(response => response.json())
      .catch( error =>
        console.log(error)
      ).then(response => {
        this.setState({
          locations: response,
          filteredLocations: response,
          selectedLocation: response[0],
        })
      });
  };

  closeModal = () => {
    this.setState({
      isShownCaseDetails: false,
    })
  };

  onChangeShownCaseDetails = (e, selectedLocation) => {
    e.stopPropagation();
    this.setState({
      isShownCaseDetails: true,
      selectedLocationCaseDetails: selectedLocation,
      isShownModalLoader: true,
    },() => {
      fetch(historicalCountry(selectedLocation.country))
        .then(response => response.json())
        .catch( error =>
          console.log(error)
        ).then(response => {
          this.setState({
            selectedLocationHistory: response,
            isShownModalLoader: false,
          })
        });
    });
  }

  render() {
    const {
      latestData: { cases, deaths, recovered, updated },
      filteredLocations,
      locations,
      selectedLocation,
      loading,
      isShownCaseDetails,
      selectedLocationCaseDetails,
      selectedLocationHistory,
      isShownModalLoader,
    } = this.state;

    const updatedDate = new Date(updated || null);    
    const lastUpdatedDate = updatedDate.getDate() + '/' + (updatedDate.getMonth() + 1) + '/' + updatedDate.getFullYear() + ' ' + updatedDate.getHours() + ':' + updatedDate.getMinutes();
    
    return (
      <div className="home-page-wrapper">
        {loading ?
          <Loader loaderIcon={Loading} />
        :
          <>
            <div className="home-page__title-container">
              <span>Coronavirus (COVID-19) Situation</span>
            </div>
            <div className="content-wrapper">
              <div className="sorting-container">
                <SortBox onClick={e => this.sortCases('deaths', e)} title="Sorting Deaths" />
                <SortBox onClick={e => this.sortCases('cases', e)} title="Sorting Cases" />
                <SortBox onClick={e => this.sortCases('recovered', e)} title="Sorting Recovered" />
              </div>
              <div className="content-wrapper__cases">
                <div className="content-wrapper__total-box">
                  <TotalBox title="Total Confirmed" count={cases} className="confirmed" />
                  <TotalBox title="Total Deaths" count={deaths} className="deaths" />
                  <TotalBox title="Total Recovered" count={recovered} className="recovered" />
                  <TotalBox title="Last Updated" count={lastUpdatedDate} className="last-updated" />
                </div>
                <div className="content-wrapper__map-container">
                  <LiveMap
                    zoom={5}
                    center={{
                      lat: Number(selectedLocation.countryInfo.lat),
                      lng: Number(selectedLocation.countryInfo.long),
                    }}
                    locations={locations}
                    selectedLocation={selectedLocation}
                    onChangeShownCaseDetails={this.onChangeShownCaseDetails}
                  />
                </div>
                <CoronaLocations
                  locations={filteredLocations}
                  setSelectedLocation={this.setSelectedLocation}
                  filterData={this.filterData}
                  onChangeShownCaseDetails={this.onChangeShownCaseDetails}
                />
              </div>
            </div>
            {isShownCaseDetails &&
              <Modal closeModal={this.closeModal}>
                {isShownModalLoader ?
                  <Loader loaderIcon={Loading} />
                  :
                  <LocationCaseDetails
                    selectedLocationCaseDetails={selectedLocationCaseDetails}
                    selectedLocationHistory={selectedLocationHistory}
                  />
                }
              </Modal>
            }
          </>
        }
      </div>
    );
  }
}

export default HomePage;
