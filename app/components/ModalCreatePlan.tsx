import React, { useState } from "react"
import { ScrollView, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import Modal from "react-native-modal"
import { VectorsIcon } from "./Vectoricon"
import { TxKeyPath } from "../i18n"
import { TextField } from "./TextField"
import { configs } from "../utils/configs"
import { Toggle } from "./Toggle"
import { LeftAccesstory } from "./ModalCreateDiary"
import { HeaderSwitch } from "./HeaderSwitch"
import { CustomColor } from "./CustomColor"

export interface ModalCreatePlanProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  type: "event" | "work"
  isVisible: boolean
  onBackDropPress: () => void
}

/**
 * Describe your component here
 */
export const ModalCreatePlan = observer(function ModalCreatePlan(props: ModalCreatePlanProps) {
  const { style, isVisible, onBackDropPress, type } = props
  const $styles = [$container, style]
  const [url, setUrl] = useState("")
  const [location, setLocation] = useState("")

  const [toggleReminder, setToggleReminder] = useState(false)
  const [toggleCountDown, setToggleCountDown] = useState(false)
  const [toggleTime, setToggleTime] = useState(false)
  const [toggleTask, setToggleTask] = useState(false)

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
      avoidKeyboard
    >
      <View style={$viewContainer}>
        <HeaderCreate typeName={type} onPressBack={onBackDropPress} onPressAdd={() => {}} />
        <ScrollView keyboardShouldPersistTaps="handled">
          <TitleAndContent />
          <View style={[$viewTitleContent, { height: null }]}>
            <HeaderSwitch
              titleTx="thoigian"
              typeIcon="AntDesign"
              nameIcon="calendar"
              activeToggle={toggleTime}
              onChangeToggle={() => setToggleTime(!toggleTime)}
            />
            <HeaderSwitch
              titleTx="nhacnho"
              typeIcon="AntDesign"
              nameIcon="calendar"
              activeToggle={toggleReminder}
              onChangeToggle={() => setToggleReminder(!toggleReminder)}
            />
            <CustomColor onPressColor={() => {}} onPressCustom={() => {}} />
            {type == "work" ? (
              <HeaderSwitch
                titleTx="nhiemvunho"
                typeIcon="FontAwesome5"
                nameIcon="tasks"
                activeToggle={toggleTask}
                onChangeToggle={() => setToggleTask(!toggleTask)}
              />
            ) : null}
            <TextField
              value={location}
              LeftAccessory={() => (
                <LeftAccesstory typeIcon="Ionicons" nameIcon="location-sharp" colorIcon="red" />
              )}
              placeholderTx="vitri"
              onChangeText={setLocation}
              inputWrapperStyle={$wrapInput}
              clearButtonMode="while-editing"
            />
            <TextField
              value={url}
              LeftAccessory={() => (
                <LeftAccesstory typeIcon="Entypo" nameIcon="link" colorIcon="red" />
              )}
              placeholder="URL"
              inputWrapperStyle={$wrapInput}
              onChangeText={setUrl}
              clearButtonMode="while-editing"
            />
            {type == "event" ? (
              <HeaderSwitch
                titleTx="demnguoc"
                typeIcon="Ionicons"
                nameIcon="hourglass-outline"
                activeToggle={toggleCountDown}
                onChangeToggle={() => setToggleCountDown(!toggleCountDown)}
              />
            ) : null}
          </View>
        </ScrollView>
      </View>
    </Modal>
  )
})

interface HeaderCreateProps {
  typeName: any
  onPressBack: () => void
  onPressAdd: () => void
}
export const HeaderCreate = (props: HeaderCreateProps) => {
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

export const TitleAndContent = () => {
  return (
    <View style={$viewTitleContent}>
      <TextField
        placeholderTx="tieude"
        inputWrapperStyle={$wrapInput}
        autoFocus
        clearButtonMode="while-editing"
        placeholderTextColor={colors.neutral900}
        style={{ fontSize: 18, ...typography.textBold, color: colors.neutral900 }}
      />
      <TextField
        placeholderTx="noidung"
        inputWrapperStyle={$wrapInput}
        multiline
        clearButtonMode="while-editing"
        style={{ fontSize: 14, ...typography.textBold, color: colors.neutral700 }}
      />
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
}
const $viewHead: ViewStyle = {
  flexDirection: "row",
  paddingVertical: 12,
  paddingHorizontal: 16,
}
const $nameHeader: TextStyle = {
  flex: 1,
  textAlign: "center",
  fontSize: 18,
  color: colors.neutral900,
}
const $viewTitleContent: ViewStyle = {
  backgroundColor: colors.neutral000,
  paddingHorizontal: 16,
  borderRadius: 8,
  paddingVertical: 12,
  ...configs.shadow,
  marginHorizontal: 16,
  marginVertical: 16,
}
const $wrapInput: ViewStyle = {
  borderWidth: 0,
  backgroundColor: colors.neutral000,
  alignItems: "center",
}
const $viewToggle: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}
