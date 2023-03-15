import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"

export interface ItemSerapatorProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const ItemSerapator = observer(function ItemSerapator(props: ItemSerapatorProps) {
  const { style } = props
  const $styles = [$container, style]

  return (
    <View style={$styles} />
  )
})

const $container: ViewStyle = {
  height: 1,
  backgroundColor: colors.neutral300
}

