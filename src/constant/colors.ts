type ColorValues<T> = {
  [K in keyof T]: T[K] extends object ? ColorValues<T[K]> : T[K];
};

const ColorConstant = {
  white: "#FFFFFF",
  gray: {
    default: "#828282",
    dark: "#4E4E4E",
    darkest: "#343434",
    light: "#CDCDCD",
    lightest: "#DADADA",
    decorative: {
      25: "#F3F3F3",
      200: "#B4B4B4",
      300: "#9B9B9B",
      400: "#828282",
      500: "#686868",
      700: "#272727",
      800: "#1A1A1A",
    },
  },
  teal: {
    default: "#00697F",
    dark: "#005466",
    darkest: "#003F4C",
    light: "#C1E0E7",
    lightest: "#E9F7FA",
    decorative: {
      200: "#72B2C0",
      300: "#228499",
      700: "#002A33",
    },
  },
  warning: {
    hard: "#D14848",
    medium: "#FF6F6F",
    soft: "#FFE4E4",
  },
  red: {
    default: "#ED260B",
    dark: "#C41800",
    darkest: "#9B1300",
    light: "#FFD7D1",
    lightest: "#FFE9E6",
    decorative: {
      200: "#FF7663",
      300: "#FF4F38",
      700: "#730E00",
    },
  },
  orange: {
    default: "#D45214",
    dark: "#A6471A",
    darkest: "#7D3514",
    light: "#F1CDBC",
    lightest: "#FAEEE9",
    decorative: {
      200: "#E39B7A",
      300: "#D97A4D",
      400: "#D05921",
      700: "#53240D",
    },
  },
};

const Colors: ColorValues<typeof ColorConstant> = ColorConstant;

export default Colors;
