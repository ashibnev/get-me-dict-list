import fetch from 'node-fetch';
import fs from 'fs';

export class CountryList {
  constructor({ url, fileName }) {
    this.url = url;
    this.fileName = fileName;

    this.createJSONFile();
  }

  fetchData() {
    return fetch(this.url)
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
  }

  async createJSONFile() {
    let result = await this.fetchData();
    const stringResult = JSON.stringify(result);

    fs.writeFile(`${this.fileName}.json`, stringResult, (err) => {
      if (err) throw err;

      console.log(`create file ${this.fileName}.json`);
    });
  }
}

// ====
