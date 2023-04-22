import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../../navigators"
import { AgendaCalendar, Header, Screen, Text } from "../../components"
import { colors, typography } from "../../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Todo: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Todo" component={TodoScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const TodoScreen: FC<StackScreenProps<AppStackScreenProps, "Todo">> = observer(
  function TodoScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()
    const [dateSelect, setDateSelect] = useState(null)

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen style={$root} preset="fixed">
        <Header backgroundColor={colors.neutral000} title={dateSelect} titleStyle={$titleStyle} />
        <AgendaCalendar onPressDate={(date) => setDateSelect(date)} />
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
const $titleStyle : TextStyle = {
  fontSize: 16,
  ...typography.textBold,
  color: colors.primary500
}