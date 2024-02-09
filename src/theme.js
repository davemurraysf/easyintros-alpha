import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export

/*
const darkModeTokens = {
  primary: "#1c1c1c",
  OrangeAccent: "#fa9101",
  blueAccent: "#39c9d4",
  redAccent: "#ec3928",
  grey: "#666666"
};

const lightModeTokens = {
  primary: "#1c1c1c",
  OrangeAccent: "#fa9101",
  blueAccent: "#39c9d4",
  redAccent: "#ec3928",
  grey: "#666666"
};
*/ 
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
      primary:{
        100: "#d2d2d2",
        200: "#a4a4a4",
        300: "#777777",
        400: "#494949",
        500: "#1c1c1c",
        600: "#161616",
        700: "#111111",
        800: "#0b0b0b",
        900: "#060606"
      },
      greenAccent: {
        100: "#fee9cc",
        200: "#fdd399",
        300: "#fcbd67",
        400: "#fba734",
        500: "#fa9101",
        600: "#c87401",
        700: "#965701",
        800: "#643a00",
        900: "#321d00"
      },
      blueAccent:{
        100: "#d7f4f6",
        200: "#b0e9ee",
        300: "#88dfe5",
        400: "#61d4dd",
        500: "#39c9d4",
        600: "#2ea1aa",
        700: "#22797f",
        800: "#175055",
        900: "#0b282a"
      },
      redAccent:{
        100: "#fbd7d4",
        200: "#f7b0a9",
        300: "#f4887e",
        400: "#f06153",
        500: "#ec3928",
        600: "#bd2e20",
        700: "#8e2218",
        800: "#5e1710",
        900: "#2f0b08"
      },
      grey: {
        100: "#e0e0e0",
        200: "#c2c2c2",
        300: "#a3a3a3",
        400: "#858585",
        500: "#666666",
        600: "#525252",
        700: "#3d3d3d",
        800: "#292929",
        900: "#141414"
      },
    }
    : {
      primary:{
        100: "#060606",
        200: "#0b0b0b",
        300: "#111111",
        400: "#161616",
        500: "#1c1c1c",
        600: "#494949",
        700: "#777777",
        800: "#a4a4a4",
        900: "#d2d2d2"
      },
      greenAccent: {
        100: "#321d00",
        200: "#643a00",
        300: "#965701",
        400: "#c87401",
        500: "#fa9101",
        600: "#fba734",
        700: "#fcbd67",
        800: "#fdd399",
        900: "#fee9cc"
      },
      blueAccent:{
        100: "#0b282a",
        200: "#175055",
        300: "#22797f",
        400: "#2ea1aa",
        500: "#39c9d4",
        600: "#61d4dd",
        700: "#88dfe5",
        800: "#b0e9ee",
        900: "#d7f4f6"
      },
      redAccent:{
        100: "#2f0b08",
        200: "#5e1710",
        300: "#8e2218",
        400: "#bd2e20",
        500: "#ec3928",
        600: "#f06153",
        700: "#f4887e",
        800: "#f7b0a9",
        900: "#fbd7d4"
      },
      grey: {
        100: "#141414",
        200: "#292929",
        300: "#3d3d3d",
        400: "#525252",
        500: "#666666",
        600: "#858585",
        700: "#a3a3a3",
        800: "#c2c2c2",
        900: "#e0e0e0"
      },
        }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            blueAccent:{
              main: colors.blueAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[700],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Poppins"],
      fontSize: 12,
      h1: {
        fontFamily: ["Poppins"],
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Poppins"],
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Poppins"],
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Poppins"],
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Poppins"],
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Poppins"],
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};