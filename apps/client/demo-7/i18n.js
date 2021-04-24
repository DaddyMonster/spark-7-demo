module.exports = {
  locales: ['en', 'ko'],
  defaultLocale: 'ko',
  /* loader: false, */
  pages: {
    '*': ['common'],
    '/': ['index'],
    '/more-info': ['more-info'],
    '/app/seven/home': ['seven-home'],
    '/app/seven/create-topic': ['seven-create-topic', 'validation'],
  },
  loadLocaleFrom: async (lang, ns) => {
    const isGlobal = /global/.test(ns);
    const json = await import(
      `../../../locales/${isGlobal ? 'global' : 'seven'}/${lang}/${ns}.json`
    );
    return json.default;
  },
};