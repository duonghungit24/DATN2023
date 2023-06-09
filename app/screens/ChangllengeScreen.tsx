import React, { FC, useEffect, useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { Button, Platform, TouchableOpacity, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Header, ModalChoosePlan, Screen, Text } from "../components"
import * as Calendar from 'expo-calendar';
import moment from "moment"
import { utils } from "../utils"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"
import * as Notifications from "expo-notifications"
import { useStores } from "../models"
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Changllenge: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Changllenge" component={ChangllengeScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
async function getDefaultCalendarSource() {
  const defaultCalendar = await Calendar.getDefaultCalendarAsync();
  console.log("default", defaultCalendar)
  return defaultCalendar.source;
}

async function createCalendar() {
  const defaultCalendarSource =
    Platform.OS === 'ios'
      ? await getDefaultCalendarSource()
      : { isLocalAccount: true, name: 'Expo Calendar' };
  console.log("au", defaultCalendarSource)
  const newCalendarID = await Calendar.createCalendarAsync({
    title: 'NoteTimeDiary',
    color: 'blue',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource?.id,
    source: defaultCalendarSource,
    name: 'internalCalendarName',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  console.log(`Your new calendar ID is: ${newCalendarID}`);
  const event = {
    title: 'Testnha111',
    notes: "hom nay test",
    startDate: moment(moment().format()).add(5, 'm').toDate(),
    endDate: moment(moment().format()).add(5, 'm').toDate(),
    alarms:[]
  };

 const create = await Calendar.createEventAsync(newCalendarID.toString(), event)
 console.log("re", create)
 
}


export const ChangllengeScreen: FC<StackScreenProps<AppStackScreenProps, "Changllenge">> = observer(function ChangllengeScreen({navigation}) {
  // Pull in one of our MST stores
   const { authStore } = useStores()
  const [isVisible, setIsvisible] = useState(false)

  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        console.log('Here are all your calendars:');
        console.log({ calendars });
      }
    })();
  }, []);

  console.log("data",new Date( new Date().getTime() - 60 * 60 * 1000).getMinutes() )
  console.log("menute", new Date().getTime() - 60 * 60 * 1000)
  console.log("dateee", new Date("2023-04-24").getTime(), new Date().getTime())

  console.log("gio",  moment("11:30").add(0, 'm').toDate())
  console.log("moment", moment().format())
  console.log("test",moment(moment().format()).add(5, 'm').toDate())
  console.log("test nofi", moment("2023-04-23").format("dddd"))

  const time = new Date(2023, 1, 21, 16, 0, 0)
const fiveMinutesBefore = new Date(time.getTime() - 5 * 60 * 1000)
console.log("five", fiveMinutesBefore, time)

  async function schedulePushNotification() {
   await Notifications.scheduleNotificationAsync({
        content: {
          title: "Time's up!",
          body: "Change sides!",
          sound:  "bipbip.wav"
        },
        trigger: {
          seconds: 2,
        //  repeats: true,
         channelId: 'default',
        },
      })

     // console.log("id", id)

      // xoá hết list thông báo
  //  await  Notifications.cancelAllScheduledNotificationsAsync()
    }


    const getAllNotification = async() => {
      const result = await Notifications.getAllScheduledNotificationsAsync()
      console.log("list", result)
    }
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={$root} preset="fixed">
      <Header />
      <View style={{height: 50}}>
      <Text style={{fontFamily: "Merriweather-Black"}} >Calendar Module Example</Text>
      <Button title="Create a new calendar" onPress={createCalendar} />
    </View>
      <Button
          title="get list"
          onPress={getDefaultCalendarSource}
        />
    <Button
          title="Press to schedule a notification"
          onPress={async () => {
            await schedulePushNotification()
          }}
        />
      <TouchableOpacity onPress={() => navigation.navigate("eventScreen")}>
          <Text>Go event</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("diaryScreen")}>
          <Text>Go diary</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => utils.showToast({
        type:"success",
        text1:"ok"
      })}>
          <Text>show toast</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={getAllNotification}>
          <Text>Get all noti</Text>
      </TouchableOpacity>
     
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
