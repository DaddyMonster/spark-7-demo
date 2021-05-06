module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      `${__dirname}/pages/**/*.{js,ts,jsx,tsx}`,
      `${__dirname}/../../../libs/**/*.{js,ts,jsx,tsx}`,
    ],
  },
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#382A40',
        secondary: '#45C291',
        success: '#bcd979',
        warning: '#FCBB6D',
        danger: '#FF533D',
        default: '#F5F5F5',
        black: '#293132',
        info: '#96C9DC',
      },
      fontFamily: {
        logo: ['S-CoreDream-9Black', 'Roboto'],
        menu: ['GmarketSansBold', 'Roboto'],
        guide: ['Noto Sans KR', 'sans-serif'],
        text: ['GmarketSansLight', 'Roboto'],
        pen: ['KyoboHand', 'Roboto'],
        pretty: ['S-CoreDream-5Medium', 'Roboto'],
        pretty2: ['Open Sans Condensed', 'Roboto'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
