import React from "react";
import Typography from "@mui/material/Typography";
import type { SxProps } from "@mui/material";
import Colors from "../../constant/colors";

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    custom: true;
  }
}

type CustomVariant<T> = {
  variant: "custom";
  customSize: T;
};

type ExistingVariant = {
  variant:
    | "body1"
    | "body2"
    | "caption"
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6";
};

type TextStyleProps = {
  id?: string;
  children: React.ReactNode;
  gutterBottom?: boolean;
  color?: string;
  weight?: string | number;
  lineHeight?: string | number;
  letterSpacing?: string | number;
  align?: "center" | "inherit" | "justify" | "left" | "right";
  customSize?: string | number;
  fontFamily?: "Open Sans";
  noWrap?: boolean;
  fontStyle?: string;
  marginBottom?: string | number;
  marginLeft?: string | number;
  marginRight?: string | number;
  marginTop?: string | number;
  sx?: SxProps;
} & (ExistingVariant | CustomVariant<string | number>);

const TextStyle = (props: TextStyleProps) => {
  const {
    id,
    children,
    gutterBottom = false,
    color = Colors.gray.decorative[800],
    weight = "400",
    fontFamily = "Open Sans",
    variant,
    customSize,
    align,
    lineHeight,
    letterSpacing,
    noWrap,
    fontStyle,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    sx,
    ...rest
  } = props;
  const letterSpacingVal = letterSpacing ?? "normal";

  const sxRoot: SxProps = {
    color,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    fontWeight: weight,
    letterSpacing: letterSpacingVal,
    "&.MuiTypography-caption": {
      fontSize: "0.625rem", // 10px
      lineHeight: lineHeight ?? "1rem",
    },
    "&.MuiTypography-body1": {
      fontSize: "0.813rem", // 13px
      lineHeight: lineHeight ?? "1.25rem",
    },
    "&.MuiTypography-body2": {
      fontSize: "0.938rem", // 15px
      lineHeight: lineHeight ?? "1.5rem",
    },
    "&.MuiTypography-h6": {
      fontSize: "1.063rem", // 17px
      lineHeight: lineHeight ?? "1.75rem",
    },
    "&.MuiTypography-h5": {
      fontSize: "1.125rem", // 18px
      lineHeight: lineHeight ?? "2rem",
    },
    "&.MuiTypography-h4": {
      fontSize: "1.25rem", // 20px
      lineHeight: lineHeight ?? "2.25rem",
    },
    "&.MuiTypography-h3": {
      fontSize: "1.5rem", // 24px
      lineHeight: lineHeight ?? "2.25rem",
    },
    "&.MuiTypography-h2": {
      fontSize: "2rem", // 32px
      lineHeight: lineHeight ?? "2.625rem",
    },
    "&.MuiTypography-h1": {
      fontSize: "2.5rem", // 40px
      lineHeight: lineHeight ?? "3.375rem",
    },
    "&.MuiTypography-custom": {
      fontSize: customSize,
      lineHeight: lineHeight ?? "1.5rem",
    },
    ...sx,
  };

  return (
    <Typography
      id={id}
      align={align}
      variant={variant}
      fontFamily={fontFamily}
      gutterBottom={gutterBottom}
      noWrap={noWrap}
      fontStyle={fontStyle}
      sx={sxRoot}
      {...rest}
    >
      {children}
    </Typography>
  );
};

export default TextStyle;
