import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#E53935",
          foreground: "#ffffff"
        },
        secondary: {
          DEFAULT: "#25D366",
          foreground: "#0b331c"
        },
        accent: "#1D3557",
        background: "#ffffff",
        muted: "#f7f7f7",
        ink: "#1c1c1c"
      },
      container: { center: true, padding: "1.5rem" },
      typography: {
        DEFAULT: {
          css: {
            color: "#1c1c1c",
            a: { color: "#E53935", "&:hover": { color: "#c62828" } }
          }
        }
      }
    }
  },
  plugins: [forms, typography]
};
