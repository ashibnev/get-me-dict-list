import fetch from 'node-fetch';
import fs from 'fs';

const DEFAULT_URL = 'https://restcountries.eu/rest/v2/all';
const DEFAULT_FILE_NAME = 'data';
const DEFAULT_TEMPLATE = null;

export class CountryList {
  constructor({
    url = DEFAULT_URL,
    fileName = DEFAULT_FILE_NAME,
    template = DEFAULT_TEMPLATE,
  }) {
    this.url = url;
    this.fileName = fileName;
    this.template = template;

    this.createJSONFile();
  }

  checkTemplate() {
    if (this.template === null) {
      console.log('Please, set template');
    }
  }

  fetchData() {
    this.checkTemplate();
    if (this.template === null) return;

    return fetch(this.url)
      .then((response) => response.json())
      .then((list) => {
        let resultList = [];

        for (const item of list) {
          resultList.push(this.template(item));
        }

        return resultList;
      });
  }

  async createJSONFile() {
    const result = await this.fetchData();
    const stringResult = JSON.stringify(result);

    fs.writeFile(`${this.fileName}.json`, stringResult, (err) => {
      if (err) throw err;

      console.log(`create file ${this.fileName}.json`);
    });
  }
}
