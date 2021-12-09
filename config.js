export const config = {
  fileName: 'data',
  dataType: 'object',
  template(_this) {
    const countryCode = _this.cca2;
    const nameInEnglish = _this.name.official;
    // const commonLang = Object.keys(_this.languages)[0];

    return {
      [countryCode]: {
        en: nameInEnglish,
        // [commonLang]: _this.languages[commonLang],
        translations: _this.translations
      },
    };
  },
};
