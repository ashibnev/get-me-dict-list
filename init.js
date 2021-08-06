import { CountryList } from './src/index.js';
import { config } from './config.js';

// new CountryList({
//   url: 'https://restcountries.eu/rest/v2/all',
//   fileName: 'data',
//   template(_this) {
//     return {
//       [_this.alpha2Code]: {
//         en: _this.name,
//         [_this.languages[0].iso639_1]: _this.nativeName,
//       },
//     };
//   },
// });

new CountryList(config);
