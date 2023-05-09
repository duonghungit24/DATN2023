import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps, goBack } from "../../navigators"
import { Button, Header, ModalConfirmDelete, Screen, Text, VectorsIcon } from "../../components"
import { colors, typography } from "../../theme"
import { ActionSheetCustom as ActionSheet } from "@alessiocancian/react-native-actionsheet"
import { configs } from "../../utils/configs"
import { useStores } from "../../models"
import { utils } from "../../utils"
import { removeNotificationById } from "../../notifications"
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
    const { todoStore } = useStores()
    const [itemDetail, setItemDetail] = useState<any>({})
    const refAction = useRef(null)
    const [isVisible, setIsvisible] = useState(false)
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
