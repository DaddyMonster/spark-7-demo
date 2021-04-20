module.exports = {
  purge: {
    enabled: false /* process.env.NODE_ENV === 'production' */,
    content: [
      `${__dirname}/pages/**/*.{js,ts,jsx,tsx}`,
      `${__dirname}/../../../libs/**/*.{js,ts,jsx,tsx}`,
    ],
  },
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#373234',
        secondary: '#c8d7d2',
        success: '#bcd979',
        warning: '#FCBB6D',
        danger: '#d84339',
        default: '#f4f2f0',
        black: '#293132',
        info: '#96C9DC',
      },
      fontFamily: {
        logo: ['S-CoreDream-9Black', 'Roboto'],
        menu: ['GmarketSansBold', 'Roboto'],
        guide: ['GmarketSansMedium', 'Roboto'],
        text: ['GmarketSansLight', 'Roboto'],
        pen: ['KyoboHand', 'Roboto'],
        pretty: ['S-CoreDream-2ExtraLight', 'Roboto'],
        pretty2: ['Open Sans Condensed', 'Roboto'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
