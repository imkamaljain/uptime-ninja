module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
      },
      colors: {
        neon: {
          blue: '#4fc3f7',
          green: '#00ffab',
          purple: '#9c27b0',
        },
      },
      boxShadow: {
        neon: '0 0 20px rgba(79, 195, 247, 0.6)',
      },
    },
  },
  plugins: [],
};
