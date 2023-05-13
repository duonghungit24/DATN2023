import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps, goBack } from "../../navigators"
import { Button, Header, ModalConfirmDelete, Screen, Text, TextField } from "../../components"
import { useStores } from "../../models"
import { removeNotificationById } from "../../notifications"
import { utils } from "../../utils"
import { colors, typography } from "../../theme"
import { ActionSheetCustom as ActionSheet } from "@alessiocancian/react-native-actionsheet"
import { RighAcessory, options } from "../TodoScreen/DetailTodoScreen"
import { configs } from "../../utils/configs"
import DateTimePickerModal from "react-native-modal-datetime-picker"
import { translate } from "../../i18n"
import * as Notifications from "expo-notifications"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `DetailEvent: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="DetailEvent" component={DetailEventScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const DetailEventScreen: FC<StackScreenProps<AppStackScreenProps, "DetailEvent">> = observer(
  function DetailEventScreen({ route }) {
    // Pull in one of our MST stores
    const { eventStore, languageStore, authStore } = useStores()
    const [itemDetail, setItemDetail] = useState<any>({})
    const refAction = useRef(null)

    const [isVisibleDate, setIsvisibleDate] = useState({ type: "", show: false })
    const [isVisible, setIsvisible] = useState(false)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
      console.log("item", route.params.itemDetail)
      setItemDetail(route.params.itemDetail)
    }, [])

    const dateSelect = () => {
      if (isVisibleDate.type == "start" && itemDetail.timeStart) {
        return new Date(itemDetail.timeStart)
      } else if (isVisibleDate.type == "end" && itemDetail.timeEnd) {
        return new Date(itemDetail.timeEnd)
      }
      return new Date()
    }

    const onConfirmDate = (value) => {
      if (isVisibleDate.type == "start") {
        setItemDetail({
          ...itemDetail,
          timeStart: value.toString(),
        })
      } else if (isVisibleDate.type == "end") {
        setItemDetail({
          ...itemDetail,
          timeEnd: value.toString(),
        })
      }
      setIsvisibleDate({ type: "", show: false })
    }

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

    const onUpdate = async () => {
      if (!itemDetail.title || !itemDetail.content) {
        utils.showToast({
          type: "warning",
          text1: translate("khongdetrongdulieu"),
        })
        return
      }
      const idNotification = await Notifications.scheduleNotificationAsync({
        content: {
          title: itemDetail.title,
          body: itemDetail.content,
          sound: authStore.sound.nameSound || "",
          //  data: { ...itemDetail, type: "event" },
        },
        trigger: {
          date: new Date(new Date(itemDetail.timeStart).getTime() - 0),
        },
      })
      removeNotificationById(itemDetail.idNotification)
      eventStore.updateEvent(utils.displayDateCalendar(itemDetail.timeStart), {
        ...itemDetail,
        idNotification,
      })
      goBack()
    }

    const onRemoveItem = async () => {
      console.log("itemdetail", itemDetail)
      removeNotificationById(itemDetail.idNotification)
      eventStore.removeEvent(utils.displayDateCalendar(itemDetail.timeStart), itemDetail)
      goBack()
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
          date={dateSelect()}
          locale={languageStore.language}
          isVisible={isVisibleDate.show}
          mode="datetime"
          onConfirm={onConfirmDate}
          onCancel={() => setIsvisibleDate({ type: "", show: false })}
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
        />
        <ScrollView showsVerticalScrollIndicator={false}>
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
              multiline
            />
            <TextField
              value={utils.displayDateHour(itemDetail.timeStart)}
              labelTx="batdau"
              editable={false}
              containerStyle={$viewInput}
              RightAccessory={RighAcessory}
              inputWrapperStyle={{ alignItems: "center" }}
              onPressIn={() => {
                if (edit) {
                  setIsvisibleDate({ type: "start", show: true })
                }
              }}
            />
            <TextField
              value={utils.displayDateHour(itemDetail.timeEnd)}
              labelTx="ketthuc"
              editable={false}
              containerStyle={$viewInput}
              RightAccessory={RighAcessory}
              inputWrapperStyle={{ alignItems: "center" }}
              onPressIn={() => {
                if (edit) {
                  setIsvisibleDate({ type: "end", show: true })
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
          <View style={{ height: 80 }} />
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

const $root: ViewStyle = {
  flex: 1,
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
