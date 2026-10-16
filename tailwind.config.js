/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FDF6F0',
          100: '#FBEADF',
          200: '#F6D2BD',
          300: '#EDB393',
          400: '#E28757',
          500: '#D35400', // Terracotta primary
          600: '#B94600', // Hover
          700: '#9C3B00', // Active
          800: '#7C3005',
          900: '#652907',
          primary: '#D9531E', // SinhVienPass brand orange
        },
        secondary: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          500: '#1E824C', // Eco / Barter
          600: '#16683C', // Eco Hover
          700: '#11522E',
        },
        accent: {
          50: '#FEF7ED',
          100: '#FDF3E1',
          500: '#E67E22', // Highlight / Pass rẻ
          600: '#D36F17',
        },
        canvas: '#FAF6F0', // Kem mộc hạn chế mỏi mắt
        surface: {
          canvas: '#FAF6F0',
          card: '#FFFFFF',
          muted: '#F3E9DD',
          accent: '#FDF3E1',
          announcement: '#FAF8F5',
        },
        text: {
          primary: '#2D241E',   // Nâu đen ấm
          muted: '#756A63',     // Muted
          disabled: '#9E928A',  // Disabled
        },
        border: {
          subtle: '#E6DACD',    // Subtle border
          card: '#EBE3D8',      // Card border
          divider: '#F3F4F6',   // Divider
        },
        semantic: {
          success: '#1E824C',
          'success-bg': '#E8F5E9',
          warning: '#E67E22',
          'warning-bg': '#FDF3E1',
          danger: '#C0392B',
          'danger-bg': '#FBECEB',
        },
      },
      fontFamily: {
        heading: ['"Be Vietnam Pro"', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'warm-xs': '0 1px 3px rgba(45, 36, 30, 0.04)',
        'warm-sm': '0 2px 8px rgba(45, 36, 30, 0.05)',
        'warm-md': '0 4px 14px rgba(45, 36, 30, 0.08)',
        'warm-lg': '0 8px 24px rgba(45, 36, 30, 0.12)',
        'focus': '0 0 0 3px rgba(211, 84, 0, 0.18)',
      },
      borderRadius: {
        xs: '6px',
        sm: '8px',
        md: '10px',
        lg: '14px',
        xl: '20px',
        pill: '9999px',
      },
    },
  },
  plugins: [],
}
