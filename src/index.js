import fetch from 'node-fetch';
import fs from 'fs';
import { DEFAULT_CONFIG } from './defaultConfig.js';

export class CountryList {
  constructor({
    url = DEFAULT_CONFIG.url,
    fileName = DEFAULT_CONFIG.fileName,
    template = DEFAULT_CONFIG.template,
    dataType = DEFAULT_CONFIG.dataType,
  }) {
    this.url = url;
    this.fileName = fileName;
    this.template = template;
    this.dataType = dataType;

    this.types = {
      array: [],
      object: {},
    };

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
        let resultData = this.types[this.dataType];

        for (const item of list) {
          switch (this.dataType) {
            case 'array':
              resultData.push(this.template(item));
              break;
            case 'object':
              Object.assign(resultData, this.template(item));
              break;
          }
        }

        return resultData;
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
