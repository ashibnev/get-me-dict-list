import fetch from 'node-fetch';
import fs from 'fs';

const URL = 'https://restcountries.eu/rest/v2/all';
const JSONFileName = 'data';

console.log('==== start work =====');
console.log();

const fetchData = () => {
  return fetch(URL)
    .then((response) => response.json())
    .then((list) => {
      let resultList = [];

      for (const item of list) {
        const name = item.name;
        const alpha2Code = item.alpha2Code;
        const nativeName = item.nativeName;
        const firstLang = item.languages[0].iso639_1;

        let resultItem = {
          [alpha2Code]: {
            en: name,
            [firstLang]: nativeName,
          },
        };

        resultList.push(resultItem);
      }

      return resultList;
    });
};

let result = await fetchData();

const createJSONFile = () => {
  const stringResult = JSON.stringify(result);

  fs.writeFile(`${JSONFileName}.json`, stringResult, (err) => {
    if (err) throw err;

    console.log(`create file ${JSONFileName}.json`);
  });
};

createJSONFile();
