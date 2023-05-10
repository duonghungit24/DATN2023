import React, { FC, useEffect, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { Animated, TouchableOpacity, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
import { TopTabAnimated, TopTapAnimated } from "../hooks/useTabAnimated"
import { colors } from "../theme"
import { TodoScreen } from "./TodoScreen/TodoScreen"
import { MemoScreen } from "./MemoScreen/MemoScreen"
import { EventScreen } from "./EventScreen/EventScreen"
import { DiaryScreen } from "./DiaryScreen/DiaryScreen"
import { useStores } from "../models"
import { onSnapshot } from "mobx-state-tree"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Management: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Management" component={ManagementScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const ManagementScreen: FC<StackScreenProps<AppStackScreenProps, "Management">> = observer(
  function ManagementScreen() {
    // Pull in one of our MST stores
    const { languageStore } = useStores()
    const {
      setActive,
      setTabOne,
      setTabTwo,
      setTabThree,
      tabOne,
      tabThree,
      tabTwo,
      active,
      translateX,
    } = TopTapAnimated()

    const renderItem = useMemo(() => {
      switch (active) {
        case 0:
          return <EventScreen />
        case 1:
          return <MemoScreen />
        case 2:
          return <DiaryScreen />
        default:
          return null
      }
    }, [active, languageStore.language])
    // Pull in navigation via hook
    // const navigation = useNavigation()

    return (
      <Screen style={$root} preset="fixed">
        <View style={$viewTab}>
          <View style={$viewTabChild}>
            <Animated.View
              style={[
                $viewActiveTab,
                {
                  transform: [
                    {
                      translateX,
                    },
                  ],
                },
              ]}
            />
            <TouchableOpacity
              style={[
                $viewItemTab,
                {
                  borderRadius: 8,
                  borderRightWidth: 0,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                },
              ]}
              onLayout={(event) => setTabOne(event.nativeEvent.layout.x)}
              onPress={() => {
                setActive(0)
              }}
              activeOpacity={0.9}
            >
              <Text
                preset="medium"
                style={{
                  color: active === 0 ? colors.neutral000 : colors.primary500,
                }}
                tx="event"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                $viewItemTab,
                {
                  borderLeftWidth: 0,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderRightWidth: 0,
                  borderTopRightRadius: 0,
                },
              ]}
              onLayout={(event) => setTabTwo(event.nativeEvent.layout.x)}
              onPress={() => {
                setActive(1)
              }}
              activeOpacity={0.9}
            >
              <Text
                preset="medium"
                style={{
                  color: active === 1 ? colors.neutral000 : colors.primary500,
                }}
                tx="note"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                $viewItemTab,
                {
                  borderRadius: 8,
                  borderLeftWidth: 0,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
              ]}
              onLayout={(event) => setTabThree(event.nativeEvent.layout.x)}
              onPress={() => {
                setActive(2)
              }}
              activeOpacity={0.9}
            >
              <Text
                preset="medium"
                style={{
                  fontSize: 14,
                  color: active === 2 ? colors.neutral000 : colors.primary500,
                }}
                tx="diary"
              />
            </TouchableOpacity>
          </View>
        </View>
        {renderItem}
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
const $viewTab: ViewStyle = {
  backgroundColor: colors.neutral000,
}
const $viewTabChild: ViewStyle = {
  width: "90%",
  flexDirection: "row",
  marginTop: 40,
  height: 40,
  position: "relative",
  marginLeft: "auto",
  marginRight: "auto",
}
const $viewActiveTab: ViewStyle = {
  position: "absolute",
  width: "33.33%",
  height: "100%",
  top: 0,
  left: 0,
  backgroundColor: colors.primary500,
  borderRadius: 8,
}
const $viewItemTab: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 1,
  borderColor: colors.primary500,
}
