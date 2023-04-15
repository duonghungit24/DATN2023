import * as React from "react"
import { ScrollView, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import Modal from "react-native-modal"
import { configs } from "../utils/configs"
import { Button } from "./Button"

export interface ModalChooseSoundProps {
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
export const ModalChooseSound = observer(function ModalChooseSound(props: ModalChooseSoundProps) {
  const { style , isVisible , onBackDropPress} = props
  const $styles = [$container, style]

  return (
    <Modal
      isVisible={isVisible}
      style={$styles}
      animationInTiming={600}
      animationOutTiming={500}
      hideModalContentWhileAnimating={true}
  > 
    <View style={$content}>
        <Text preset="bold" tx="chonambao" style={$label}/>
        <ScrollView>

        </ScrollView>
        <View style={$viewButton}>
          <Button tx="huy" style={$viewBtn}/>
          <View style={{width: 16}} />
          <Button tx="luu"style={$viewBtn}/>
        </View>
    </View>
    </Modal>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  margin: 0
}
const $content: ViewStyle  = {
  height: configs.windowHeight / 2,
  backgroundColor: colors.neutral000,
  marginHorizontal: 16,
  borderRadius: 12,
}

const $label : TextStyle = {
  fontSize: 18,
  textAlign: 'center',
  color: colors.neutral900,
  padding: 16
}
const $viewButton : ViewStyle = {
  flexDirection: "row",
  padding: 16
}
const $viewBtn : ViewStyle = {
  flex:  1
}