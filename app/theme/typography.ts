import { Platform, TextStyle } from "react-native"

const fonts = {
  
    // Cross-platform Google font.
    light:  "GoogleSans-Light",
    regular:  "GoogleSans-Regular",
    medium:  "NotoSans-Medium",
    semiBold:  "NotoSans-Bold",
    bold:  "NotoSans-Bold",

}

export const typography = {
  /**
   * The fonts are available to use, but prefer using the semantic name.
   */
  fonts,
  /**
   * The primary font. Used in most places.
   */
  primary: fonts,
  // familyBold: Platform.select({ ios: "GoogleSans-Bold", android: "GoogleSans-Bold" }),
  // familyLight: Platform.select({ ios: "GoogleSans-Light", android: "GoogleSans-Light" }),
  // familyMedium: Platform.select({ ios: "GoogleSans-Medium", android: "GoogleSans-Medium" }),
  // familyRegular: Platform.select({ ios: "GoogleSans-Regular", android: "GoogleSans-Regular" }),
  textBold: {
    ...Platform.select({
      ios: {
        fontFamily: "NotoSans-Bold",
        fontWeight:"600",
      },
      android: {
        fontFamily: "NotoSans-Bold",
        fontWeight: "600",
      },
    }),
  } as TextStyle,
  textBoldMedium: {
    ...Platform.select({
      ios: {
        fontFamily: "NotoSans-Medium",
        fontWeight: "500",
      },
      android: {
        fontFamily: "NotoSans-Medium",
        fontWeight: "500",
      },
    }),
  } as TextStyle,
  textRegular: {
    ...Platform.select({
      ios: {
        fontFamily: "GoogleSans-Regular",
        fontWeight: "400",
      },
      android: {
        fontFamily: "GoogleSans-Regular",
        fontWeight: "400",
      },
    }),
  } as TextStyle,
  textLight: {
    ...Platform.select({
      ios: {
        fontFamily: "GoogleSans-Light",
        fontWeight: "400",
      },
      android: {
        fontFamily: "GoogleSans-Light",
        fontWeight: "400",
      },
    }),
  } as TextStyle,
  textMedium: {
    ...Platform.select({
      ios: {
        fontFamily: "GoogleSans-Medium",
        fontWeight: "500",
      },
      android: {
        fontFamily: "GoogleSans-Medium",
        fontWeight: "500",
      },
    }),
  } as TextStyle,

}
