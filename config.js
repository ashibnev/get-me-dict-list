export const config = {
  fileName: 'data',
  dataType: 'object',
  template(_this) {
    const countryCode = _this.alpha2Code;
    const nameInEnglish = _this.name;
    const commonLang = _this.languages[0].iso639_1;
    const nativeName = _this.nativeName;
    const currencyCode = _this.currencies ? _this.currencies[0].code : 'USD';

    return {
      [countryCode]: {
        en: nameInEnglish,
        [commonLang]: nativeName,
        translations: _this.translations,
        currencyCode: currencyCode
      },
    };
  },
};
