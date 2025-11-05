import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        marhaban: {
          beige: "#FDF8F3",
          blue: "#1F3A5F",
          gold: "#BFA45B",
          goldHover: "#A68D44",
          red: "#B2452F",
          white: "#FFFFFF",
          charcoal: "#0B2239",
          night: "#081628"
        },
        "marhaban-beige": "#FDF8F3",
        "marhaban-blue": "#1F3A5F",
        "marhaban-gold": "#BFA45B",
        "marhaban-gold-hover": "#A68D44",
        "marhaban-red": "#B2452F",
        "marhaban-white": "#FFFFFF",
        "marhaban-charcoal": "#0B2239",
        "marhaban-night": "#081628",
        primary: "#1F3A5F",
        primaryDark: "#0B2239",
        primaryLight: "#284A71",
        secondary: "#BFA45B",
        secondaryDark: "#A68D44",
        secondaryLight: "#D8BF7E",
        gold: {
          DEFAULT: "#BFA45B",
          hover: "#A68D44"
        },
        goldHover: "#A68D44",
        beigeLight: "#FDF8F3",
        cream: "#FDF8F3",
        white: "#FFFFFF",
        navy: "#0B2239",
        navyLight: "#284A71",
        night: "#081628",
        textDark: "#1F3A5F",
        textLight: "#FDF8F3",
        grayText: "#1C2B3E",
        grayLight: "#F4EEE7",
        lightGray: "#F4EEE7",
        darkGray: "#0B2239",
        textMain: "#1F3A5F",
        textSecondary: "#1F3A5F",
        mutedLight: "#5C6E82",
        mutedDark: "#CFD7DE",
        redAccent: "#B2452F",
        lineLight: "#E6DACE",
        lineDark: "#1F3A5F",
        accent: { DEFAULT: "#BFA45B", foreground: "#1F3A5F" },
        background: "#FDF8F3",
        muted: "#E8DCCB",
        ink: "#1F3A5F"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        title: ["Poppins", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        display: ["Poppins", "sans-serif"],
        inter: ["Inter", "system-ui", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        quote: ["Playfair Display", "serif"]
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.1)"
      },
      borderRadius: {
        xl: "1rem"
      },
      container: { center: true, padding: "1.5rem" },
      typography: {
        DEFAULT: {
          css: {
            color: "#1F3A5F",
            a: { color: "#1F3A5F", "&:hover": { color: "#BFA45B" } },
            h1: { fontFamily: "Poppins, sans-serif", color: "#1F3A5F" },
            h2: { fontFamily: "Poppins, sans-serif", color: "#1F3A5F" },
            blockquote: {
              fontFamily: "'Playfair Display', serif",
              color: "#1F3A5F",
              fontStyle: "italic"
            }
          }
        }
      }
    }
  },
  plugins: [forms, typography]
};
