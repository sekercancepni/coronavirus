export const GOOGLE_API = process.env.GOOGLE_MAP_API_KEY;

export const apiConfig = {
  latestData: 'https://corona.lmao.ninja/v2/all',
  countries: 'https://corona.lmao.ninja/v2/countries',
  historicalCountry: country => `https://corona.lmao.ninja/v2/historical/${country}`,
  countriesSort: sortingKey => `https://corona.lmao.ninja/v2/countries?sort=${sortingKey}`,
};
