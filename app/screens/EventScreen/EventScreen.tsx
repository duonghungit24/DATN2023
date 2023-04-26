import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, ViewStyle, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../../navigators"
import { Header, Screen, Text } from "../../components"
import { colors } from "../../theme"
import { ListEvent } from "./ListEvent"
import {
  ExpandableCalendar,
  TimelineEventProps,
  TimelineList,
  CalendarProvider,
  TimelineProps,
  CalendarUtils,
} from "react-native-calendars"
import groupBy from "lodash/groupBy"
import { configs } from "../../utils/configs"
import { useStores } from "../../models"
import { utils } from "../../utils"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Event: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Event" component={EventScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const EventScreen: FC<StackScreenProps<AppStackScreenProps, "Event">> = observer(
  function EventScreen() {
    // Pull in one of our MST stores
     const { eventStore } = useStores()
    const [listEvents, setListEvents] = useState([])

    const INITIAL_TIME = { hour: 9, minutes: 0 }
    const EVENT_COLOR = "#e6add8"
    const getDate = (offset = 0) =>
      CalendarUtils.getCalendarDateString(new Date().setDate(new Date().getDate() + offset))
    console.log("date", getDate(1))
    console.log("new date", new Date().toISOString())

    useEffect(() => {
      console.log("listeve", eventStore.getListEvents())
      setListEvents(eventStore.listEvents)
    },[eventStore.refreshEvent])

    const EVENTS = [
      {
        start: `${new Date().toISOString()}`,
        end: `${new Date().toISOString()}`,
        title: "Merge Request to React Native Calendars",
        summary: "Merge Timeline Calendar to React Native Calendars",
        hello: true,
      },
      {
        start: `${getDate(-2)} 10:20:00`,
        end: `${getDate(-2)} 12:00:00`,
        title: "Merge Request to React Native Calendars",
        summary: "Merge Timeline Calendar to React Native Calendars",
        hello: true,
        key: "okeeeee",
      },
      {
        start: `${getDate()} 01:15:00`,
        end: `${getDate()} 02:30:00`,
        title: "Meeting A",
        summary: "Summary for meeting A",
        color: EVENT_COLOR,
      },
      {
        start: `${getDate()} 01:30:00`,
        end: `${getDate()} 02:30:00`,
        title: "Meeting B",
        summary: "Summary for meeting B",
        color: EVENT_COLOR,
      },
      {
        start: `${getDate()} 01:45:00`,
        end: `${getDate()} 02:45:00`,
        title: "Meeting C",
        summary: "Summary for meeting C",
        color: EVENT_COLOR,
      },
    ]
    const eventsByDate = groupBy(listEvents, (e) => utils.displayDateCalendar(e.start)) as {
      [key: string]: TimelineEventProps[]
    }

    console.log("group", CalendarUtils.getCalendarDateString(new Date()))
    console.log("even", eventsByDate)
    const timelineProps: Partial<TimelineProps> = {
      format24h: true,
      // onBackgroundLongPress: this.createNewEvent,
      // onBackgroundLongPressOut: this.approveNewEvent,
      scrollToFirst: true,
      start: 0,
      end: 24,
      unavailableHours: [
        { start: 0, end: 6 },
        { start: 22, end: 24 },
      ],
      overlapEventsSpacing: 8,
      rightEdgeSpacing: 24,
      onEventPress: (value) => console.log("value", value),
      styles: {
        eventTimes: { color: "red" },
        eventTitle: { color: "white" },
        eventSummary: { color: "white", paddingTop: 4 },
        calendarBackground: colors.neutral100,
        agendaKnobColor: "red"
      },
      //  renderEvent: (event) => <View style={{height: event.height, top: 0, width: event.width, backgroundColor: "red", padding: 0}}><Text>okk</Text></View>
    }
    // console.log("event", eventsByDate)
    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen style={$root} preset="fixed">
        <CalendarProvider
          date={getDate()}
          // onDateChanged={this.onDateChanged}
          // onMonthChange={this.onMonthChange}
        //  disabledOpacity={0.6}
          // numberOfDays={3}
        theme={{agendaKnobColor:"red" }}
        
        >
          <ExpandableCalendar
            firstDay={1}
            // leftArrowImageSource={require('../img/previous.png')}
            // rightArrowImageSource={require('../img/next.png')}
            markedDates={{
              "2023-04-17": {
                dots: [
                  { key: "1", color: "blue" },
                  { key: "2", color: "red" },
                  { key: "4", color: "red" },
                ],
              },
            }}
            markingType="multi-dot"
            theme={configs.THEME}  
            hideKnob={false}
          />
          <TimelineList
            events={eventsByDate}
            timelineProps={timelineProps}
            showNowIndicator
            scrollToNow
            scrollToFirst
            initialTime={INITIAL_TIME}
          />
        </CalendarProvider>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.neutral000,
}
