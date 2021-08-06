import fetch from 'node-fetch';
import fs from 'fs';

export class CountryList {
  constructor({ url, fileName, template }) {
    this.url = url;
    this.fileName = fileName;
    this.template = template;

    this.createJSONFile();
  }

  fetchData() {
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
