import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Header, Screen, Text, TextField } from "../components"
import { colors } from "../theme"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Statistics: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Statistics" component={StatisticsScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const StatisticsScreen: FC<StackScreenProps<AppStackScreenProps, "Statistics">> = observer(function StatisticsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="fixed">
      <Header backgroundColor="transperant" LeftActionComponent={() => (<TextField placeholder="okk" />)}/>
      <View style={$container}>
        <Text preset="semibold" tx="tongquan" style={$textOverview} />
      </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background
}
const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: 16
}
const $textOverview : TextStyle = {
  marginTop: 12,
  fontSize: 20,
  color: colors.neutral900
}