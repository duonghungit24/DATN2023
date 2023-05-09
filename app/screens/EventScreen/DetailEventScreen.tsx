import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps, goBack } from "../../navigators"
import { Button, Header, ModalConfirmDelete, Screen, Text } from "../../components"
import { useStores } from "../../models"
import { removeNotificationById } from "../../notifications"
import { utils } from "../../utils"
import { colors, typography } from "../../theme"
import { ActionSheetCustom as ActionSheet } from "@alessiocancian/react-native-actionsheet"
import { options } from "../TodoScreen/DetailTodoScreen"
import { configs } from "../../utils/configs"
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
    const { eventStore } = useStores()
    const [itemDetail, setItemDetail] = useState<any>({})
    const refAction = useRef(null)
    const [isVisible, setIsvisible] = useState(false)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
      console.log("item", route.params.itemEvent)
      setItemDetail(route.params.itemEvent)
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
        {edit ? (
          <View style={$viewButton}>
            <Button tx="luu" textStyle={$textButton} onPress={() => {}} />
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
