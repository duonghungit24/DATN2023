import React, { useState } from "react"
import { ImageStyle, ScrollView, StyleProp,TouchableOpacity, View, ViewStyle , Image, TextStyle} from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import Modal from "react-native-modal"
import { HeaderCreate } from "./ModalCreatePlan"
import { TextField } from "./TextField"
import { configs } from "../utils/configs"
import { VectorsIcon } from "./Vectoricon"
import { Toggle } from "./Toggle"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { useStores } from "../models"
import { utils } from "../utils"
import { translate } from "../i18n"

export interface ModalCreateDiaryProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  isVisible: boolean
  onBackDropPress: () => void
}

interface TypeTime {
  type: "date" | "time" | "datetime"
  show: boolean
}
/**
 * Describe your component here
 */
export const ModalCreateDiary = observer(function ModalCreateDiary(props: ModalCreateDiaryProps) {
  const { style, isVisible, onBackDropPress } = props
  const { languageStore } = useStores()
  const $styles = [$container, style]

  const [url, setUrl] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState(new Date().toISOString())
  const [time, setTime] = useState(utils.getTime())

  const [toggleDate, setToggleDate] = useState(false)
  const [togglePin, setTogglePin] = useState(false)
  const [isVisibleDate, setIsvisibleDate] = useState<TypeTime>({ type: "date", show: false })

  const onConfirmDate = (value) => {
    console.log("value", new Date(value).getHours())
  }

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
        <DateTimePickerModal
          locale={languageStore.language}
          isVisible={isVisibleDate.show}
          mode={isVisibleDate.type}
          onConfirm={onConfirmDate}
          onCancel={() => setIsvisibleDate({ type: "date", show: false })}
          cancelTextIOS={translate("huy")}
          confirmTextIOS={translate("xacnhan")}
        />
        <HeaderCreate typeName="nhatky" onPressBack={onBackDropPress} onPressAdd={() => {}} />
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={$viewTitleContent}>
            <TextField
              placeholderTx="nhatkytext"
              inputWrapperStyle={$wrapInput}
              autoFocus
              clearButtonMode="while-editing"
              placeholderTextColor={colors.neutral900}
              multiline
              style={$inputDiary}
            />
          </View>
          <View style={[$viewTitleContent, { height: 100 }]}>
            <Text preset="bold" tx="bieutuongcamxuc" style={$textEmoji} />
          </View>
          <View style={[$viewTitleContent, { height: null }]}>
            <View style={$viewToggle}>
              <TextField
                LeftAccessory={() => (
                  <LeftAccesstory typeIcon="AntDesign" nameIcon="calendar" colorIcon="red" />
                )}
                placeholderTx="thoigian"
                inputWrapperStyle={$wrapInput}
                containerStyle={{ flex: 1 }}
                style={{ ...typography.textBold }}
                placeholderTextColor={colors.neutral900}
                editable={false}
              />
              <Toggle
                variant="switch"
                value={toggleDate}
                onPress={() => setToggleDate(!toggleDate)}
              />
            </View>
            <TextField
              LeftAccessory={() => (
                <LeftAccesstory typeIcon="AntDesign" nameIcon="calendar" colorIcon="red" />
              )}
              value={utils.displayDate(date)}
              inputWrapperStyle={$wrapInput}
              clearButtonMode="while-editing"
              editable={false}
              onPressIn={() => setIsvisibleDate({ type: "date", show: true })}
              // style={{fontSize: 18, ...typography.textBold, color: colors.neutral900 }}
            />
            <TextField
              LeftAccessory={() => (
                <LeftAccesstory typeIcon="Feather" nameIcon="clock" colorIcon="red" />
              )}
              value={time}
              inputWrapperStyle={$wrapInput}
              clearButtonMode="while-editing"
              editable={false}
              onPressIn={() => setIsvisibleDate({ type: "time", show: true })}
              // style={{fontSize: 18, ...typography.textBold, color: colors.neutral900 }}
            />
            <View style={$viewToggle}>
              <TextField
                LeftAccessory={() => (
                  <LeftAccesstory typeIcon="Entypo" nameIcon="pin" colorIcon="red" />
                )}
                placeholderTx="ghim"
                inputWrapperStyle={$wrapInput}
                containerStyle={{ flex: 1 }}
                editable={false}
              />
              <Toggle variant="switch" value={togglePin} onPress={() => setTogglePin(!togglePin)} />
            </View>
            <TextField
              value={url}
              LeftAccessory={() => (
                <LeftAccesstory typeIcon="Ionicons" nameIcon="location-sharp" colorIcon="red" />
              )}
              placeholderTx="vitri"
              onChangeText={setLocation}
              inputWrapperStyle={$wrapInput}
              clearButtonMode="while-editing"
              // style={{fontSize: 18, ...typography.textBold, color: colors.neutral900 }}
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
              // style={{fontSize: 18, ...typography.textBold, color: colors.neutral900 }}
            />
            <SelectImage />
          </View>
        </ScrollView>
      </View>
    </Modal>
  )
})

const LeftAccesstory = ({ typeIcon, nameIcon, colorIcon }: any) => {
  return <VectorsIcon type={typeIcon} name={nameIcon} color={colorIcon} size={20} />
}

const SelectImage = ({onPressAdd, onPressRemove} : any) => {
  return (
    <View style={$viewRowImg}>
      <VectorsIcon type="Feather" name="image" color="red" size={20} style={{ marginRight: 12 }} />
      <TouchableOpacity style={$viewBtnImg} activeOpacity={0.8}>
        <TouchableOpacity style={$btnClose} onPress={onPressRemove}>
          <VectorsIcon type="Ionicons" name="md-close-outline" color="white" size={20} />
        </TouchableOpacity>
        <Image source={{uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png"}}  style={$image}/>
      </TouchableOpacity>
      <TouchableOpacity style={[$viewBtnImg, $viewAddImg]} onPress={onPressAdd}>
          <VectorsIcon type="AntDesign" name="plus" color="red" size={20} />
      </TouchableOpacity>
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
const $wrapInput: ViewStyle = {
  borderWidth: 0,
  backgroundColor: colors.neutral000,
  alignItems: "center",
}
const $inputDiary = { fontSize: 16, ...typography.textBold, color: colors.neutral900 }
const $viewToggle: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
}
const $viewRowImg: ViewStyle = {
  flexDirection: "row",
  alignItems: "center",
}
const $viewBtnImg: ViewStyle = {
  height: 50,
  width: 40,
  marginRight: 16,
}
const $btnClose: ViewStyle = {
  height: 20,
  width: 20,
  borderRadius: 10,
  backgroundColor: "red",
  position: "absolute",
  top: -8,
  right: -8,
  alignContent: "center",
  justifyContent: 'center'
}
const $viewAddImg : ViewStyle  = {
  borderWidth: 1,
  borderColor: colors.neutral500,
  justifyContent: "center",
  alignItems:'center'
}
const $image :ImageStyle = {
  height: "100%",
  width: "100%",
  zIndex: -10,
  resizeMode:"cover"
}
const $textEmoji : TextStyle = {
  fontSize: 18,
  textAlign: "center"
}