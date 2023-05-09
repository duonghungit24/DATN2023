import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import Modal from "react-native-modal"
import { configs } from "../utils/configs"
import { Button } from "./Button"

export interface ModalConfirmDeleteProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  isVisible: boolean
  onBackDropPress: () => void
  onPressRemove: () => void
}

/**
 * Describe your component here
 */
export const ModalConfirmDelete = observer(function ModalConfirmDelete(
  props: ModalConfirmDeleteProps,
) {
  const { style, isVisible, onBackDropPress, onPressRemove } = props
  const $styles = [$container, style]

  return (
    <Modal isVisible={isVisible} onBackdropPress={onBackDropPress} style={$styles}>
      <View style={$content}>
        <>
          <Text preset="semibold" tx="banCoChanXoa" style={$label} />
        </>
        <View style={$viewButton}>
          <Button
            tx="huy"
            textStyle={{ color: colors.neutral700 }}
            style={[$btn, { backgroundColor: colors.neutral300 }]}
            onPress={onBackDropPress}
          />
          <View style={{ width: 16 }} />
          <Button
            tx="xoa"
            textStyle={{ color: colors.neutral100 }}
            style={[$btn, { backgroundColor: colors.primary500 }]}
            onPress={() => {
              onPressRemove()
              onBackDropPress()
            }}
          />
        </View>
      </View>
    </Modal>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  margin: 0,
}
const $content: ViewStyle = {
  marginHorizontal: 20,
  backgroundColor: colors.neutral100,
  minHeight: configs.windowHeight * 0.25,
  alignItems: "center",
  borderRadius: 8,
}
const $viewButton: ViewStyle = {
  position: "absolute",
  width: "100%",
  flexDirection: "row",
  bottom: 20,
  paddingHorizontal: 24,
}
const $label: TextStyle = {
  fontSize: 20,
  color: colors.neutral900,
  padding: 16,
}
const $btn: ViewStyle = {
  flex: 1,
  borderRadius: 4,
}
const $text: TextStyle = {
  color: colors.primary500,
  fontSize: 15,
  marginTop: 4,
}
const $name: TextStyle = {
  color: "#F16063",
  fontSize: 15,
  marginTop: 4,
}
