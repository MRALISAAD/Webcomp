module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#d32f2f',
          dark: '#b71c1c',
          pale: '#fde8e8',
          gray: '#eef2f5',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -15px rgba(211, 47, 47, 0.4)',
      },
    },
  },
  plugins: [],
};
