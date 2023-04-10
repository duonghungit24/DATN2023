import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import {
  TouchableOpacity,
  ViewStyle,
  View,
  ScrollView,
  FlatList,
  TouchableWithoutFeedback,
  TextStyle,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Header, Icon, Screen, Text } from "../components"
import { colors } from "../theme"
import { configs } from "../utils/configs"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Diary: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Diary" component={DiaryScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const DiaryScreen: FC<StackScreenProps<AppStackScreenProps, "Diary">> = observer(
  function DiaryScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen style={$root} preset="fixed">
        <Header titleTx="diary" backgroundColor={colors.neutral000} />
        <FlatList 
          data={[1,2,3,4]}
          renderItem={({item}) => {
            return (
              <ItemDiary />
            )
          }}
        />
      </Screen>
    )
  },
)

const ItemDiary = () => {
  return (
    <>
      <View style={$viewTitle}>
        <Text preset="bold" style={$textTitle}>
          09/04/2023
        </Text>
      </View>
      <TouchableWithoutFeedback onPress={() => console.log("opk")}>
        <View style={$viewRow}>
          <Text preset="bold" style={$time}>
            05:09 CH
          </Text>
          <View style={$viewShadow}>
            <View style={{ flex: 1 }}>
              <Text preset="medium" style={$textItem}>
                hiihi
              </Text>
              <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8,]}
                keyExtractor={(_, index) => `${index}`}
                scrollEventThrottle={16}
                renderItem={({ item, index }) => {
                  return (
                    <View onStartShouldSetResponder={() => true}>
                      <TouchableOpacity onPress={() => console.log("ok")}>
                        <View
                          style={{ height: 50, width: 35, backgroundColor: "red", margin: 4, borderRadius: 4 }}
                        />
                      </TouchableOpacity>
                    </View>
                  )
                }}
                horizontal
                style={{ flexDirection: "row" }}
              />
            </View>
            <Icon icon="bell" />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  )
}

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.neutral000,
}
const $viewRow: ViewStyle = {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  paddingHorizontal: 16
}
const $viewShadow: ViewStyle = {
  flex: 1,
  padding: 8,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.neutral000,
  borderRadius: 12,
  ...configs.shadow,
  marginLeft: 16,
}
const $container: ViewStyle = {
 
}
const $time: TextStyle = {
  color: colors.neutral900,
}
const $textItem: TextStyle = {
  color: colors.neutral900,
}
const $viewTitle: ViewStyle = {
  paddingHorizontal: 12,
  backgroundColor: "#FFF4E7",
  paddingVertical: 8,
  width: "30%",
  borderTopRightRadius: 24,
  borderBottomRightRadius: 24,
  marginVertical: 12
}
const $textTitle: TextStyle = {}
