export const config = {
  fileName: 'data',
  template(_this) {
    return {
      [_this.alpha2Code]: {
        en: _this.name,
        [_this.languages[0].iso639_1]: _this.nativeName,
      },
    };
  },
};
