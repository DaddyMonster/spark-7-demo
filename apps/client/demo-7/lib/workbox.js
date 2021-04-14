import { Workbox } from 'workbox-window';

export default () => {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.workbox = new Workbox('/sw.js', { scope: '/' });
    window.workbox.register();

    const cacheOnFrontEndNav = function () {
      if (!window.navigator.onLine) return;

      return fetch('/').then(function (response) {
        if (!response.redirected) {
          return caches
            .open('start-url')
            .then((cache) => cache.put('/', response));
        }
        return Promise.resolve();
      });
    };

    const pushState = history.pushState;
    history.pushState = function () {
      pushState.apply(history, arguments);
      cacheOnFrontEndNav(arguments[0].url);
    };

    const replaceState = history.replaceState;
    history.replaceState = function () {
      replaceState.apply(history, arguments);
      cacheOnFrontEndNav(arguments[0].url);
    };

    window.addEventListener('online', () => {
      cacheOnFrontEndNav(window.location.pathname);
    });
  }
};
