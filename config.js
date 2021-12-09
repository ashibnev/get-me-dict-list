export const config = {
  fileName: 'data',
  dataType: 'object',
  template(_this) {
    const countryCode = _this.alpha2Code;
    const nameInEnglish = _this.name;
    const commonLang = _this.languages[0].iso639_1;
    const nativeName = _this.nativeName;

    return {
      [countryCode]: {
        en: nameInEnglish,
        [commonLang]: _this.nativeName,
        translations: _this.translations
      },
    };
  },
};
