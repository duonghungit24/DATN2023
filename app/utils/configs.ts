import { iconLanguage } from './../theme/image';
import { Dimensions, Platform } from "react-native"
// Size Iphone 11 pro
const guidelineBaseWidth = 375
const guidelineBaseHeight = 812
const { width, height } = Dimensions.get("window")
export const configs = {
  windowWidth: width,
  windowHeight: height,
  horizontalScale: (size: number) => (width / guidelineBaseWidth) * size,
  verticalScale: (size: number) => (height / guidelineBaseHeight) * size,
  moderateScale: (size: number, factor = 0.5) => {
    return size + (configs.verticalScale(size) - size) * factor
  },
  PAGE_SIZE: 10,
  formatDateDisplay: "DD/MM/YYYY",
  formatDateHouseDisplay: "DD/MM/YYYY HH:mm",
  formatDateRequest: "YYYY-MM-DD",
  TITLE_EMTY: "Không có dữ liệu",
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  LIST_LANGUAGE: [
    {
      type: "vi",
      name: "Vietnamese",
      image: iconLanguage.iconVn
    },
    {
      type: "en",
      name: "English",
      image: iconLanguage.iconEn
    },
    {
      type: "ja",
      name: "Japanese",
      image: iconLanguage.iconJa
    },
    {
      type: "ko",
      name: "Korean",
      image: iconLanguage.iconKo
    },
  ],
  Animations : [
    "fadeIn",
    "fadeInUp",
    "fadeInDown",
    "fadeInDownBig",
    "fadeInUpBig",
    "fadeInLeft",
    "fadeInLeftBig",
    "fadeInRight",
    "fadeInRightBig",
  
    "flipInX",
    "flipInY",
   
    "slideInDown",
    "slideInUp",
    "slideInLeft",
    "slideInRight",
    
    "zoomIn",
    "zoomInDown",
    "zoomInUp",
    "zoomInLeft",
    "zoomInRight",
  ]
}