module.exports = {
  locales: ['en', 'ko'],
  defaultLocale: 'ko',
  loader: false,
  pages: {
    '/': ['home'],
    '/more-info': ['more-info'],
  },
  loadLocaleFrom: async (lang, ns) => {
    const isGlobal = /global/.test(ns);
    const json = await import(
      `../../../locales/${isGlobal ? 'global' : 'seven'}/${lang}/${ns}.json`
    );
    return json.default;
  },
};
