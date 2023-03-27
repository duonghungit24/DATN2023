import * as React from "react"
import { ScrollView, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import Modal from "react-native-modal"
import { HeaderCreate } from "./ModalCreatePlan"
import { TextField } from "./TextField"
import { configs } from "../utils/configs"

export interface ModalCreateDiaryProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  isVisible: boolean
  onBackDropPress: () => void
}

/**
 * Describe your component here
 */
export const ModalCreateDiary = observer(function ModalCreateDiary(props: ModalCreateDiaryProps) {
  const { style, isVisible, onBackDropPress } = props
  const $styles = [$container, style]

  return (
    <Modal
    isVisible={isVisible}
    onBackdropPress={onBackDropPress}
    style={$styles}
    animationInTiming={600}
    animationOutTiming={500}
    onSwipeComplete={onBackDropPress}
    swipeDirection={"down"}
    propagateSwipe={true}
  >
    <View style={$viewContainer}>
      <HeaderCreate typeName="nhatky" onPressBack={onBackDropPress} onPressAdd={() => {}} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={$viewTitleContent}>
        <TextField
          placeholderTx="nhatkytext"
          inputWrapperStyle={$wrapInput}
          autoFocus
          clearButtonMode="while-editing"
          placeholderTextColor={colors.neutral900}
          style={{fontSize: 18, ...typography.textBold, color: colors.neutral900 }}
        />
        </View>
        <View style={[$viewTitleContent, {height: 100}]}>
           <Text preset="bold" tx="bieutuongcamxuc" />
          </View>
      </ScrollView>
    </View>
  </Modal>
  )
})
const $container: ViewStyle = {
  margin: 0,
  justifyContent: "flex-start",
}
const $viewContainer: ViewStyle = {
  marginTop: 56,
  backgroundColor: colors.neutral100,
  flex: 1,
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
}
const $viewTitleContent: ViewStyle = {
  backgroundColor: colors.neutral000,
  paddingHorizontal: 16,
  borderRadius: 8,
  paddingVertical: 12,
  ...configs.shadow,
  marginHorizontal: 16,
  marginTop: 16,
  height: configs.windowHeight / 3,
}
const $wrapInput: ViewStyle = { borderWidth: 0, backgroundColor: colors.neutral000 }