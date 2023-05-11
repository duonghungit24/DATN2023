import React, { FC, useCallback, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps, goBack } from "../../navigators"
import {
  Button,
  Header,
  ModalConfirmDelete,
  Screen,
  Text,
  TextField,
  VectorsIcon,
} from "../../components"
import { colors, typography } from "../../theme"
import { ActionSheetCustom as ActionSheet } from "@alessiocancian/react-native-actionsheet"
import { configs } from "../../utils/configs"
import { useStores } from "../../models"
import { utils } from "../../utils"
import { removeNotificationById, setScheduleNotificationAsync } from "../../notifications"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { translate } from "../../i18n"
import * as Notifications from "expo-notifications"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `DetailTodo: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="DetailTodo" component={DetailTodoScreen} />`
// Hint: Look for the 🔥!
const $colorText: TextStyle = { color: "#35ABFF", fontSize: 16 }
export const options = [
  <Text preset="semibold" style={$colorText} tx="boqua" />,
  <Text preset="regular" style={$colorText} tx="sua" />,
  <Text preset="regular" style={[$colorText, { color: colors.error }]} tx="xoa" />,
]

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const DetailTodoScreen: FC<StackScreenProps<AppStackScreenProps, "DetailTodo">> = observer(
  function DetailTodoScreen({ route }) {
    // Pull in one of our MST stores
    const { todoStore, languageStore, authStore } = useStores()
    const [itemDetail, setItemDetail] = useState<any>({})
    const refAction = useRef(null)

    const [isVisible, setIsvisible] = useState(false)
    const [isVisibleDate, setIsvisibleDate] = useState(false)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
      setItemDetail(route.params.itemTodo)
    }, [])

    const onPressAction = (index) => {
      switch (index) {
        case 1:
          setEdit(true)
          break
        case 2:
          setIsvisible(true)
        default:
          break
      }
    }

    const onRemoveItem = async () => {
      removeNotificationById(itemDetail.idNotification)
      todoStore.removeTodo(utils.displayDateCalendar(itemDetail.time), itemDetail)
      goBack()
    }

    const onConfirmDate = (value) => {
      setItemDetail({
        ...itemDetail,
        time: value,
      })
      setIsvisibleDate(false)
    }

    const onUpdate = async () => {
      if (!itemDetail.title || !itemDetail.content) {
        utils.showToast({
          type: "warning",
          text1: translate("khongdetrongdulieu"),
        })
        return
      }
      const content = {
        title: itemDetail.title,
        body: itemDetail.content,
        sound: authStore.sound.nameSound || "",
        data: { ...itemDetail, type: "todo" },
      }
      const trigger = {
        date: new Date(new Date(itemDetail.time).getTime() - 0),
      }
      const idNotification = await Notifications.scheduleNotificationAsync({
        content: content,
        trigger: {
          date: new Date(new Date(itemDetail.time).getTime() - 0),
        },
      })
      //  const idNotification = await setScheduleNotificationAsync(content, trigger)
      console.log("id", idNotification)
    }

    return (
      <Screen style={$root} preset="fixed">
        <Header
          typeIconLeft="AntDesign"
          leftIcon="arrowleft"
          typeIconRight="Entypo"
          rightIcon="dots-three-horizontal"
          backgroundColor={colors.neutral000}
          titleTx="thongtinchitiet"
          onRightPress={() => refAction.current.show()}
        />
        <DateTimePickerModal
          date={new Date(itemDetail.time)}
          locale={languageStore.language}
          isVisible={isVisibleDate}
          mode="datetime"
          onConfirm={onConfirmDate}
          onCancel={() => setIsvisibleDate(false)}
          cancelTextIOS={translate("huy")}
          confirmTextIOS={translate("xacnhan")}
        />
        <ModalConfirmDelete
          isVisible={isVisible}
          onBackDropPress={() => setIsvisible(false)}
          onPressRemove={onRemoveItem}
        />
        <ActionSheet
          ref={refAction}
          options={options}
          cancelButtonIndex={0}
          onPress={onPressAction}
          theme="ios"
          styles={configs.actionStyle}
        />
        <ScrollView>
          <View style={$container}>
            <TextField
              require
              value={itemDetail.title}
              labelTx="tieude"
              editable={edit}
              onChangeText={(text) =>
                setItemDetail({
                  ...itemDetail,
                  title: text,
                })
              }
            />
            <TextField
              require
              value={itemDetail.content}
              labelTx="noidungtieude"
              onChangeText={(text) =>
                setItemDetail({
                  ...itemDetail,
                  content: text,
                })
              }
              editable={edit}
              containerStyle={$viewInput}
            />
            <TextField
              value={utils.displayDateHour(itemDetail.time)}
              labelTx="thoigian"
              editable={edit}
              containerStyle={$viewInput}
              RightAccessory={RighAcessory}
              inputWrapperStyle={{ alignItems: "center" }}
              onPressIn={() => {
                if (edit) {
                  setIsvisibleDate(true)
                }
              }}
            />
            <TextField
              value={itemDetail.location}
              labelTx="vitri"
              editable={edit}
              containerStyle={$viewInput}
              onChangeText={(text) =>
                setItemDetail({
                  ...itemDetail,
                  location: text,
                })
              }
            />
            <TextField
              value={itemDetail.url}
              label="URL"
              editable={edit}
              containerStyle={$viewInput}
              onChangeText={(text) =>
                setItemDetail({
                  ...itemDetail,
                  url: text,
                })
              }
            />
          </View>
        </ScrollView>
        {edit ? (
          <View style={$viewButton}>
            <Button tx="luu" textStyle={$textButton} onPress={onUpdate} />
          </View>
        ) : null}
      </Screen>
    )
  },
)

const RighAcessory = () => {
  return (
    <VectorsIcon
      type="Feather"
      name="chevron-down"
      color={colors.neutral400}
      size={20}
      style={{ marginRight: 12 }}
    />
  )
}

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.neutral000,
}
const $viewButton: ViewStyle = {
  position: "absolute",
  width: "100%",
  bottom: 0,
  padding: 16,
  backgroundColor: colors.neutral000,
  ...configs.shadow,
}
const $textButton: TextStyle = { ...typography.textBold, fontSize: 14, color: colors.neutral000 }
const $container: ViewStyle = {
  padding: 16,
}
const $viewInput: ViewStyle = {
  marginTop: 12,
}
