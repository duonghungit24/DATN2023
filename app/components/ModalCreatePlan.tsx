import React, { useMemo, useReducer, useState } from "react"
import { ScrollView, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import Modal from "react-native-modal"
import { VectorsIcon } from "./Vectoricon"
import { translate, TxKeyPath } from "../i18n"
import { TextField } from "./TextField"
import { configs } from "../utils/configs"
import { Toggle } from "./Toggle"
import { LeftAccesstory } from "./ModalCreateDiary"
import { HeaderSwitch } from "./HeaderSwitch"
import { CustomColor } from "./CustomColor"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { useStores } from "../models"
import { utils } from "../utils"
import uuid from "react-native-uuid"
import { Button } from "./Button"
import { t } from "i18n-js"

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
  const { languageStore } = useStores()
  const $styles = [$container, style]

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [url, setUrl] = useState("")
  const [location, setLocation] = useState("")
  const [date, setDate] = useState(new Date())
  const [listTaskChild, setListTaskChild] = useState([])

  const [toggleReminder, setToggleReminder] = useState(false)
  const [toggleCountDown, setToggleCountDown] = useState(false)
  const [toggleTime, setToggleTime] = useState(false)
  const [toggleTask, setToggleTask] = useState(false)
  const [isVisibleDate, setIsvisibleDate] = useState(false)

  const onConfirmDate = (value) => {
    console.log("value", value)
    setDate(value)
    setIsvisibleDate(false)
    console.log("date", date)
  }

  const showStartEndDate = useMemo(() => {
    return (
      <View style={$viewChild}>
        <TextField
          value={utils.displayDateHour(date)}
          LeftAccessory={() => (
            <LeftAccesstory
              typeIcon="AntDesign"
              nameIcon="calendar"
              colorIcon={colors.primary500}
            />
          )}
          placeholderTx="batdau"
          inputWrapperStyle={$wrapInput}
          clearButtonMode="while-editing"
          editable={false}
          onPressIn={() => setIsvisibleDate(true)}
        />
      </View>
    )
  }, [toggleTime, date])

  const showReminder = useMemo(() => {
    return (
      <>
        <TextField
          value={"15 phút trước"}
          LeftAccessory={() => (
            <LeftAccesstory typeIcon="Feather" nameIcon="clock" colorIcon={colors.primary500} />
          )}
          onChangeText={setLocation}
          inputWrapperStyle={$wrapInput}
          clearButtonMode="while-editing"
          editable={false}
          onPressIn={() => {}}
        />
      </>
    )
  }, [toggleReminder])

  const onCreateTask = () => {
    const obj = {
      id: uuid.v4(),
      nameTaskChild: "",
      isDone: false,
    }
    const dt = []
    dt.push(obj)
    setListTaskChild([...listTaskChild, ...dt])
  }

  const onRemoveItem = (indexTask) => {
    const dt = listTaskChild.filter((_, index) => index != indexTask)
    setListTaskChild(dt)
  }

  const onChangeTask = (value, indexTask) => {
    const dt = listTaskChild.map((el, index) => {
      if (index == indexTask) {
        return {
          ...el,
          nameTaskChild: value,
        }
      }
      return {
        ...el,
      }
    })
    setListTaskChild(dt)
  }

  const showTaskChild = useMemo(() => {
    return (
      <View style={$viewChild}>
        {listTaskChild.map((item, index) => {
          return (
            <View style={$viewTask} key={index}>
              <TextField
                value={item.nameTaskChild}
                LeftAccessory={() => (
                  <LeftAccesstory
                    typeIcon="Octicons"
                    nameIcon="dot-fill"
                    colorIcon={colors.primary500}
                  />
                )}
                onChangeText={(text) => onChangeTask(text, index)}
                inputWrapperStyle={$wrapInput}
                RightAccessory={() => {
                  if (item.nameTaskChild) {
                    return (
                      <TouchableOpacity onPress={() => onRemoveItem(index)}>
                        <LeftAccesstory
                          typeIcon="Feather"
                          nameIcon="x"
                          colorIcon={colors.primary500}
                        />
                      </TouchableOpacity>
                    )
                  } else {
                    return null
                  }
                }}
              />
            </View>
          )
        })}
        <TouchableOpacity style={$viewBtn} onPress={onCreateTask}>
          <Text preset="regular" style={$textBtn}>
            Thêm nhiệm vụ nhỏ
          </Text>
        </TouchableOpacity>
      </View>
    )
  }, [toggleTask, listTaskChild])

  console.log("list", listTaskChild)

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
      avoidKeyboard
    >
      <View style={$viewContainer}>
        <DateTimePickerModal
          date={date}
          locale={languageStore.language}
          isVisible={isVisibleDate}
          mode="datetime"
          onConfirm={onConfirmDate}
          onCancel={() => setIsvisibleDate(false)}
          cancelTextIOS={translate("huy")}
          confirmTextIOS={translate("xacnhan")}
        />
        <HeaderCreate typeName={type} onPressBack={onBackDropPress} onPressAdd={() => {}} />
        <ScrollView keyboardShouldPersistTaps="handled">
          <TitleAndContent
            title={title}
            content={content}
            onChangeTitle={setTitle}
            onChangeContent={setContent}
          />
          <View style={[$viewTitleContent, { height: null }]}>
            <HeaderSwitch
              titleTx="thoigian"
              typeIcon="Ionicons"
              nameIcon="ios-today"
              activeToggle={toggleTime}
              onChangeToggle={() => setToggleTime(!toggleTime)}
            />
            {toggleTime && showStartEndDate}
            <HeaderSwitch
              titleTx="nhacnho"
              typeIcon="AntDesign"
              nameIcon="calendar"
              activeToggle={toggleReminder}
              onChangeToggle={() => setToggleReminder(!toggleReminder)}
            />
            {toggleReminder && showReminder}
            <CustomColor onPressColor={() => {}} onPressCustom={() => {}} />
            {type == "work" ? (
              <>
                <HeaderSwitch
                  titleTx="nhiemvunho"
                  typeIcon="FontAwesome5"
                  nameIcon="tasks"
                  activeToggle={toggleTask}
                  onChangeToggle={() => setToggleTask(!toggleTask)}
                />
                {toggleTask && showTaskChild}
              </>
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
            {/* {type == "event" ? (
              <HeaderSwitch
                titleTx="demnguoc"
                typeIcon="Ionicons"
                nameIcon="hourglass-outline"
                activeToggle={toggleCountDown}
                onChangeToggle={() => setToggleCountDown(!toggleCountDown)}
              />
            ) : null} */}
          </View>
        </ScrollView>
        <View style={$viewButton}>
          <Button tx="taocongviec" textStyle={{...typography.textBold, fontSize: 14, color: colors.neutral000}}/>
        </View>
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

export const TitleAndContent = ({ title, content, onChangeTitle, onChangeContent }) => {
  return (
    <View style={$viewTitleContent}>
      <TextField
        value={title}
        onChangeText={onChangeTitle}
        placeholderTx="tieude"
        inputWrapperStyle={$wrapInput}
        autoFocus
        clearButtonMode="while-editing"
        placeholderTextColor={colors.neutral700}
        style={{ fontSize: 18, ...typography.textBold, color: colors.neutral900 }}
      />
      <TextField
        value={content}
        onChangeText={onChangeContent}
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
  zIndex: 1,
}
const $wrapInput: ViewStyle = {
  borderWidth: 0,
  backgroundColor: colors.neutral000,
  alignItems: "center",
}
const $viewChild: ViewStyle = {
  paddingHorizontal: 16,
}
const $viewTask: ViewStyle = {
  marginTop: 8,
}
const $viewBtn: ViewStyle = {
  backgroundColor: colors.primary500,
  padding: 8,
  marginTop: 8,
  borderRadius: 4,
  width: "60%",
}
const $textBtn: TextStyle = {
  color: colors.neutral000,
  textAlign: "center",
  fontSize: 14,
}
const $viewButton : ViewStyle = {padding: 16,backgroundColor: colors.neutral000, ...configs.shadow}