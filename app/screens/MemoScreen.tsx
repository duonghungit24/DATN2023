import React, { FC, useEffect, useLayoutEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  View,
  TouchableOpacity,
  FlatList,
  Button,
  Platform,
  TextStyle,
} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Header, Screen, Text, VectorsIcon } from "../components"
import { colorRandomItem, colors } from "../theme"
import * as Animatable from "react-native-animatable"
import { configs } from "../utils/configs"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import * as Notifications from "expo-notifications"
import { useStores } from "../models"
import { utils } from "../utils"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Memoscreen: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Memoscreen" component={MemoscreenScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const MemoScreen: FC<StackScreenProps<AppStackScreenProps, "Memoscreen">> = observer(
  function MemoscreenScreen({ navigation }) {
    // Pull in one of our MST stores
    const { memoStore } = useStores()
    const viewRef = useRef(null)
    const [listMemo, setListMemo] = useState([])

    useLayoutEffect(() => {
      setListMemo(memoStore.listMemo)
    }, [memoStore.isRefreshMemo])

    console.log("list", listMemo)
    // useEffect(() => {
    //   getPermission()
    //   requestPermissionsAsync()
    // }, []);

    const renderItem = ({ item, index }) => (
      <ListItem
        item={item}
        index={index}
        navigation={navigation}
        onDelete={() => memoStore.deleteMemo(item.id)}
      />
    )
    // // Pull in navigation via hook
    // // const navigation = useNavigation()
    // async function schedulePushNotification() {
    //   Notifications.scheduleNotificationAsync({
    //     content: {
    //       title: "Time's up!",
    //       body: "Change sides!",
    //     },
    //     trigger: {
    //       seconds: 2,
    //     },
    //   })
    // }
    // async function getPermission() {
    //   const { status: existingStatus } = await Notifications.getPermissionsAsync()
    //   let finalStatus = existingStatus
    //   console.log("status",finalStatus)
    //   if (existingStatus !== "granted") {
    //     const { status } = await Notifications.requestPermissionsAsync()
    //     finalStatus = status
    //   }
    //   if (finalStatus !== "granted") {
    //     alert("Failed to get push token for push notification!")
    //     return
    //   }
    // }

    // const requestPermissionsAsync = async() => {
    //    await Notifications.requestPermissionsAsync({
    //     ios: {
    //       allowAlert: true,
    //       allowBadge: true,
    //       allowSound: true,
    //       allowAnnouncements: true,
    //     },
    //   });
    // }
    return (
      <Screen style={$root} preset="fixed">
        <Header backgroundColor="red" title="memo" />
        {/* <Button
          title="Press to schedule a notification"
          onPress={async () => {
            await schedulePushNotification()
          }}
        />
        <Button
          title="Press to schedule a notification"
          onPress={requestPermissionsAsync}
        /> */}
        <Animatable.View animation="slideInUp" duration={1000} style={{ flex: 1 }}>
          <FlatList
            data={listMemo.slice()}
            keyExtractor={(_, index) => `${index}`}
            numColumns={2}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 8 }}
          />
        </Animatable.View>
      </Screen>
    )
  },
)

const ListItem = ({ item, index, animation, navigation, onDelete }: any) => {
  // const bgColor = (i) => colorRandomItem[i % colorRandomItem.length]
  return (
    // <Animatable.View animation={animation} duration={1000} delay={index * 300}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Screen")}>
        <View style={$viewItem}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text preset="bold" style={$textTitle}>
                {item.title}
              </Text>
              <Text preset="medium" style={$textContent}>
                {item.content}
              </Text>
            </View>
            <TouchableOpacity onPress={onDelete}>
              <VectorsIcon type="MaterialIcons" name="delete" size={20} color={colors.accent500} />
            </TouchableOpacity>
          </View>
          <View style={$viewDate}>
            <Text preset="medium" style={$textDate}>{utils.displayDateHour(item.time)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    // </Animatable.View>
  )
}

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.neutral100,
}
const $viewItem: ViewStyle = {
  borderRadius: 10,
  width: (configs.windowWidth - 48) / 2,
  height: configs.windowHeight / 3.5,
  marginHorizontal: 8,
  backgroundColor: colors.neutral000,
  ...configs.shadow,
  marginTop: 16,
  padding: 16,
}
const $textTitle: TextStyle = {
  fontSize: 16,
  color: colors.neutral900,
}
const $textContent: TextStyle = {
  color: colors.neutral700,
  marginTop: 4,
}
const $viewDate : ViewStyle = {
    bottom: 0,
    backgroundColor: "#FEE1E9",
    padding: 4, borderRadius: 4,
    alignItems:'center'
}
const $textDate: TextStyle = {
  color: colors.primary500
}