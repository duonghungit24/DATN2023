import * as React from "react"
import { ScrollView, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import Modal from "react-native-modal"
import { Header } from "./Header"
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
  const { style , isVisible, onBackDropPress} = props
  const $styles = [$container, style]

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onBackDropPress}
      style={$styles}
      animationInTiming={500}
      animationOutTiming={500}
      onSwipeComplete={onBackDropPress}
      swipeDirection={'down'}
      propagateSwipe={true}

    >
      
    <View style={$viewContainer} >
      
      <Text >event</Text>
      <ScrollView>  
      <Text >hello</Text>
      </ScrollView>
    </View>
    </Modal>
  )
})

const $container: ViewStyle = {
  margin: 0,
  justifyContent:"flex-start"
}
const $viewContainer : ViewStyle = {
   marginTop: 56,
   backgroundColor: colors.neutral000,
   flex: 1,
   borderTopLeftRadius: 12,
   borderTopRightRadius: 12
}
