import * as React from "react"
import { ScrollView, StyleProp, TextInput, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import Modal from "react-native-modal"
import { VectorsIcon } from "./Vectoricon"
import { TxKeyPath } from "../i18n"
import { TextField } from "./TextField"
import { color } from "react-native-reanimated"
import { configs } from "../utils/configs"

export interface ModalCreatePlanProps {
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
export const ModalCreatePlan = observer(function ModalCreatePlan(props: ModalCreatePlanProps) {
  const { style, isVisible, onBackDropPress } = props
  const $styles = [$container, style]

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackDropPress}
      style={$styles}
      animationInTiming={500}
      animationOutTiming={500}
      onSwipeComplete={onBackDropPress}
      swipeDirection={"down"}
      propagateSwipe={true}
    >
      <View style={$viewContainer}>
        <HeaderCreate typeName="sukien" onPressBack={onBackDropPress} onPressAdd={() => {}} />
        <ScrollView>
          <TitleAndContent />
          <Text>hello</Text>
        </ScrollView>
      </View>
    </Modal>
  )
})

interface HeaderCreateProps {
  typeName: TxKeyPath
  onPressBack: () => void
  onPressAdd: () => void
}
const HeaderCreate = (props: HeaderCreateProps) => {
  const { typeName, onPressAdd, onPressBack } = props
  return (
    <View style={$viewHead}>
      <TouchableOpacity activeOpacity={0.7} onPress={onPressBack}>
        <VectorsIcon name="arrowleft" type="AntDesign" size={25} color={colors.primary500} />
      </TouchableOpacity>
      <Text style={$nameHeader} tx={typeName} preset="bold" />
      <TouchableOpacity activeOpacity={0.7} onPress={onPressAdd}>
        <VectorsIcon name="check" type="Feather" size={25} color={colors.primary500} />
      </TouchableOpacity>
    </View>
  )
}

const TitleAndContent = () => {
  return (
    <View style={$viewTitleContent}>
        <TextField placeholderTx="tieude" inputWrapperStyle={$wrapInput}  autoFocus/>
        <TextField placeholderTx="noidung" inputWrapperStyle={$wrapInput} multiline/>
    </View>
  )
}

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
  paddingHorizontal: 16,
}
const $viewHead: ViewStyle = {
  flexDirection: "row",
  paddingVertical: 12,
}
const $nameHeader: TextStyle = {
  flex: 1,
  textAlign: "center",
  fontSize: 16,
  color: colors.neutral900
}
const $viewTitleContent : ViewStyle = {
  backgroundColor: colors.neutral000,
  paddingHorizontal: 16,
  borderRadius: 8,
  paddingVertical: 12,
  ...configs.shadow
}
const $wrapInput : ViewStyle = {borderWidth: 0, backgroundColor: colors.neutral000}