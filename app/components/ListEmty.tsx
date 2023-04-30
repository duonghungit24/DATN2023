import * as React from "react"
import {
  StyleProp,
  TextStyle,
  View,
  ViewStyle,
  Image,
  ImageStyle,
  TouchableOpacity,
} from "react-native"
import { observer } from "mobx-react-lite"
import { colors } from "../theme"
import { Text } from "./Text"
import { ImageConstant } from "../theme/image"

const $container: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
  paddingVertical: 16,
}

export interface ListEmptyProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const ListEmpty = React.memo(
  observer(function ListEmpty(props: ListEmptyProps) {
    const { style } = props
    const styles = Object.assign({}, $container, style)

    return (
      <View style={styles}>
        <Image source={ImageConstant.emty} style={$image} />
        <Text preset="regular" style={$text} tx="trong" />
      </View>
    )
  }),
)

const $image: ImageStyle = {
  width: 140,
  height: 140,
  marginVertical: 20,
  resizeMode: "contain",
}
const $text: TextStyle = {
  fontSize: 16,
  color: colors.neutral900,
}
const $textHere: TextStyle = {
  color: colors.primary500,
  textDecorationLine: "underline",
  fontSize: 16,
}
