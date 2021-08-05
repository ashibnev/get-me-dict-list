import { CountryList } from './src/index.js';

new CountryList({
  url: 'https://restcountries.eu/rest/v2/all',
  fileName: 'data',
});
