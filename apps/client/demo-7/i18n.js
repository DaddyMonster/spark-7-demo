module.exports = {
  locales: ['en', 'ko'],
  defaultLocale: 'ko',
  /* loader: false, */
  pages: {
    '*': ['common'],
    '/': ['index'],
    '/more-info': ['more-info'],
    '/app/seven/home': ['seven-home', 'chat-detail-modal', 'recommanded-user'],
    '/app/seven/social': ['seven-social', 'recommanded-user'],
    '/app/seven/learn-and-teach': ['learn-and-teach', 'chat-detail-modal'],
    '/app/seven/create-topic': ['seven-create-topic', 'validation'],
    '/app/seven/live/[roomId]': ['live-chat', 'live-chat-tool'],
    '/app/seven/activity-log': ['activity-log'],
  },
  loadLocaleFrom: async (lang, ns) => {
    const isGlobal = /global/.test(ns);
    const json = await import(
      `../../../locales/${isGlobal ? 'global' : 'seven'}/${lang}/${ns}.json`
    );
    return json.default;
  },
};
