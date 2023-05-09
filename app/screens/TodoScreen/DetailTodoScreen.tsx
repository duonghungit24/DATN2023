import React, { FC, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../../navigators"
import { Header, ModalConfirmDelete, Screen, Text, VectorsIcon } from "../../components"
import { colors } from "../../theme"
import { ActionSheetCustom as ActionSheet } from "@alessiocancian/react-native-actionsheet"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `DetailTodo: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="DetailTodo" component={DetailTodoScreen} />`
// Hint: Look for the 🔥!
const $colorText: TextStyle = { color: "#637aff", fontSize: 16 }
const options = [
  <Text preset="semibold" style={$colorText} tx="boqua" />,
  <Text preset="regular" style={$colorText} tx="sua" />,
  <Text preset="regular" style={[$colorText, { color: colors.error }]} tx="xoa" />,
]

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const DetailTodoScreen: FC<StackScreenProps<AppStackScreenProps, "DetailTodo">> = observer(
  function DetailTodoScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    const refAction = useRef(null)
    const [isVisible, setIsvisible] = useState(false)
    const [edit, setEdit] = useState(false)

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
          onPressRemove={() => {}}
        />
        <ActionSheet
          ref={refAction}
          options={options}
          cancelButtonIndex={0}
          onPress={onPressAction}
        />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
