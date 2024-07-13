module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        sans:['Open Sans'],
        lato:['Lato']
      }
    },
  },
  plugins: [],
  screens: {
    'md': {'max': '739px'},
      // => @media (max-width: 739px) { ... }

    'sm':{'min':'740px'},

    // 'sm': {'min': '740px', 'max': '1023px'},
    // => @media (min-width: 768px and max-width: 1023px) { ... }

    // 'lg': {'min': '1024px'},
    // => @media (min-width: 1024px) { ... }
  },
}