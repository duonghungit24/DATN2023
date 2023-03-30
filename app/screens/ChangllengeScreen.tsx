import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Button, Platform, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Header, ModalChoosePlan, Screen, Text } from "../components"
import * as Calendar from 'expo-calendar';
import moment from "moment"
import { TopTabAnimated } from "../hooks/useTabAnimated"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

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

export const ChangllengeScreen: FC<StackScreenProps<AppStackScreenProps, "Changllenge">> = observer(function ChangllengeScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
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

  console.log("gio",  moment("11:30").add(0, 'm').toDate())
  console.log("moment", moment().format())
  console.log("test",moment(moment().format()).add(5, 'm').toDate())
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    // <Screen style={$root} preset="fixed">
    //   <Header />
    //   <View style={{height: 50}}>
    //   <Text style={{fontFamily: "Merriweather-Black"}} >Calendar Module Example</Text>
    //   <Button title="Create a new calendar" onPress={createCalendar} />
     
    // </View>
    // </Screen>
    <TopTabAnimated />
  )
})

const $root: ViewStyle = {
  flex: 1,
}
