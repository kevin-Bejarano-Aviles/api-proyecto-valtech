module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        yellow: '#FFEB33',
        green: '#0BA4A0',
        blue:'#2E384D',
        letrafooter: '#1EC5BB',
        graybackground:'#DADEEB',
        imgheader: '#DADEEB',
        bordergray: '#E4E8F0',
        inputbackground: '#F9FBFD',
        backgroundGray:'#E9F9F8',
        hoverlogout:'#F8FAFC',
      },
      screens: {
        'mobile': '360px',
        'tablet': '640px',
        // => @media (min-width: 640px) { ... }
        'laptop': '1024px',
        // => @media (min-width: 1024px) { ... }
        'desktop': '1280px',
        // => @media (min-width: 1280px) { ... }
      }
    },
  },
  plugins: [],
}