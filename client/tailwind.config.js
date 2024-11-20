module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // Define your custom colors here, use approximate colors if you don't have the exact codes
        'primary': '#E3210C', // replace with your primary color
        'secondary': '#yourSecondaryColor', // replace with your secondary color
        // Add as many color variations as you need
      },
      fontFamily: {
        // Define your custom font here, ensure you've included the font files in your project
        'primary': ['Space Grotesk', 'sans-serif'], // replace 'YourCustomFont' with your font's name
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
