import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../../navigators"
import { Button, Header, ModalConfirmDelete, Screen, Text } from "../../components"
import { colors, typography } from "../../theme"
import { useStores } from "../../models"
import { options } from "../TodoScreen/DetailTodoScreen"
import { ActionSheetCustom as ActionSheet } from "@alessiocancian/react-native-actionsheet"
import { configs } from "../../utils/configs"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `DetailMemo: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="DetailMemo" component={DetailMemoScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const DetailMemoScreen: FC<StackScreenProps<AppStackScreenProps, "DetailMemo">> = observer(function DetailMemoScreen() {
  // Pull in one of our MST stores
  const { memoStore } = useStores()
    const [itemDetail, setItemDetail] = useState<any>({})
    const refAction = useRef(null)
    const [isVisible, setIsvisible] = useState(false)
    const [edit, setEdit] = useState(false)

    useEffect(() => {
     // setItemDetail(route.params.itemTodo)
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
        {edit ? (
          <View style={$viewButton}>
            <Button tx="luu" textStyle={$textButton} onPress={() => {}} />
          </View>
        ) : null}
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor:colors.background
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
