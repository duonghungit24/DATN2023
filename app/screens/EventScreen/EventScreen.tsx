import React, { FC } from "react"
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
  CalendarUtils
} from 'react-native-calendars';
import groupBy from 'lodash/groupBy';
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
    // const { someStore, anotherStore } = useStores()
    const INITIAL_TIME = {hour: 9, minutes: 0};
    const EVENT_COLOR = '#e6add8';
    const getDate = (offset = 0) => CalendarUtils.getCalendarDateString(new Date().setDate(new Date().getDate() + offset));
    console.log("date", getDate(1))
    const EVENTS = [{
      start: `${getDate(-1)} 09:20:00`,
      end: `${getDate(-1)} 12:00:00`,
      title: 'Merge Request to React Native Calendars',
      summary: 'Merge Timeline Calendar to React Native Calendars',
    },
    {
      start: `${getDate()} 01:15:00`,
      end: `${getDate()} 02:30:00`,
      title: 'Meeting A',
      summary: 'Summary for meeting A',
      color: EVENT_COLOR
    },
    {
      start: `${getDate()} 01:30:00`,
      end: `${getDate()} 02:30:00`,
      title: 'Meeting B',
      summary: 'Summary for meeting B',
      color: EVENT_COLOR
    },
    {
      start: `${getDate()} 01:45:00`,
      end: `${getDate()} 02:45:00`,
      title: 'Meeting C',
      summary: 'Summary for meeting C',
      color: EVENT_COLOR
    },]
   const eventsByDate = groupBy(EVENTS, e => CalendarUtils.getCalendarDateString(e.start)) as {
    [key: string]: TimelineEventProps[];
  }

  console.log("group", CalendarUtils.getCalendarDateString(new Date()))
  const timelineProps: Partial<TimelineProps> = {
    format24h: true,
    // onBackgroundLongPress: this.createNewEvent,
    // onBackgroundLongPressOut: this.approveNewEvent,
    scrollToFirst: true,
    start: 0,
    end: 24,
    unavailableHours: [{start: 0, end: 6}, {start: 22, end: 24}],
    overlapEventsSpacing: 8,
    rightEdgeSpacing: 24,
    onEventPress: (value) => console.log("value", value)
  };
  // console.log("event", eventsByDate)
    // Pull in navigation via hook
    // const navigation = useNavigation()
    return (
      <Screen style={$root} preset="fixed">
        <Header  leftIcon="arrowleft" typeIconLeft="AntDesign" />
        {/* <ScrollView >
          <ListEvent />
        </ScrollView> */}
     <CalendarProvider
        date={getDate()}
        // onDateChanged={this.onDateChanged}
        // onMonthChange={this.onMonthChange}
        showTodayButton
        disabledOpacity={0.6}
        // numberOfDays={3}
      >
        <ExpandableCalendar
          firstDay={1}
          // leftArrowImageSource={require('../img/previous.png')}
          // rightArrowImageSource={require('../img/next.png')}
         markedDates={{
          '2023-04-11': {
            dots: [{key: 'running', color: 'blue'}, {key: '2', color: 'red'}]
          },
        }}
        markingType="multi-dot"
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
