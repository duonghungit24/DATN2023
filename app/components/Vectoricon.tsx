import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import Feather from "react-native-vector-icons/Feather"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Fontisto from "react-native-vector-icons/Fontisto"
import Foundation from "react-native-vector-icons/Foundation"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Octicons from "react-native-vector-icons/Octicons"
// import { createIconSetFromFontello } from "react-native-vector-icons"
// import fontelloConfig from "./VectorConfig.json"

// const IconFontello = createIconSetFromFontello(fontelloConfig)

export type TypeVectorsIcon =
  | "AntDesign"
  | "Entypo"
  | "EvilIcons"
  | "Feather"
  | "FontAwesome"
  | "FontAwesome5"
  | "Fontisto"
  | "Foundation"
  | "Ionicons"
  | "MaterialCommunityIcons"
  | "MaterialIcons"
  | "Octicons"
  | "Default"

export interface VectorsIconProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  name: string
  color?: string
  size?: number
  type: TypeVectorsIcon
}

/**
 * Describe your component here
 */
export const VectorsIcon = observer(function VectorsIcon(props: VectorsIconProps) {
  const { style, name, type, color, size } = props
  switch (type) {
    case "AntDesign":
      return <AntDesign name={name} size={size} color={color} style={style} />
    case "Entypo":
      return <Entypo name={name} size={size} color={color} style={style} />
    case "EvilIcons":
      return <EvilIcons name={name} size={size} color={color} style={style} />
    case "Feather":
      return <Feather name={name} size={size} color={color} style={style} />
    case "FontAwesome":
      return <FontAwesome name={name} size={size} color={color} style={style} />
    case "FontAwesome5":
      return <FontAwesome5 name={name} size={size} color={color} style={style} />
    case "Fontisto":
      return <Fontisto name={name} size={size} color={color} style={style} />
    case "Foundation":
      return <Foundation name={name} size={size} color={color} style={style} />
    case "Ionicons":
      return <Ionicons name={name} size={size} color={color} style={style} />
    case "MaterialCommunityIcons":
      return <MaterialCommunityIcons name={name} size={size} color={color} style={style} />
    case "MaterialIcons":
      return <MaterialIcons name={name} size={size} color={color} style={style} />
    case "Octicons":
      return <Octicons name={name} size={size} color={color} style={style} />
    case "Default":
      return null
  }
})
