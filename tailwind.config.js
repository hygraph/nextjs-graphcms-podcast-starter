const defaultVariants = [
  "responsive",
  "group-hover",
  "focus-within",
  "first",
  "last",
  "odd",
  "even",
  "hover",
  "focus",
  "active",
  "visited",
  "disabled"
];

module.exports = {
  theme: {
    fontFamily: {
      display: ["Source Sans Pro", "Verdana"],
      body: ["Open Sans", "Verdana"]
    },
    extend: {
      spacing: {
        half: "50%",
        full: "100%"
      },
      inset: {
        "1/2": "50%"
      },
      colors: {
        darkgray: {
          100: "#EAEAEB",
          200: "#CACBCC",
          300: "#AAABAE",
          400: "#6A6C71",
          500: "#2A2D34",
          600: "#26292F",
          700: "#191B1F",
          800: "#131417",
          900: "#0D0E10"
        },
        tomato: {
          100: "#FDE7EC",
          200: "#FAC2D0",
          300: "#F79DB4",
          400: "#F2547B",
          500: "#EC0B43",
          600: "#D40A3C",
          700: "#8E0728",
          800: "#6A051E",
          900: "#470314"
        }
      }
    },
    container: {
      center: true,
      padding: "2rem"
    }
  },
  variants: {
    opacity: defaultVariants,
    display: defaultVariants,
    height: defaultVariants,
    textDecoration: defaultVariants
  },
  plugins: []
};
