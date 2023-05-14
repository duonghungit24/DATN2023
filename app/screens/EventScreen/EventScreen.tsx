import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps, navigate } from "../../navigators"
import { Header, Screen } from "../../components"
import { colors } from "../../theme"
import {
  ExpandableCalendar,
  TimelineList,
  CalendarProvider,
  TimelineProps,
  CalendarUtils,
} from "react-native-calendars"
import { configs } from "../../utils/configs"
import { useStores } from "../../models"
import { onSnapshot } from "mobx-state-tree"

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
    const { eventStore, languageStore } = useStores()
    const [listEvents, setListEvents] = useState({})
    const [refresh, setRefresh] = useState(false)

    const INITIAL_TIME = { hour: 9, minutes: 0 }
    const getDate = (offset = 0) =>
      CalendarUtils.getCalendarDateString(new Date().setDate(new Date().getDate() + offset))

    useEffect(() => {
      setListEvents(eventStore.getListEvents())
    }, [eventStore.refreshEvent])

    useEffect(() => {
      onSnapshot(languageStore, (lang) => {
        setRefresh(!refresh)
      })
    }, [languageStore.language])

    const handleNavigate = (value: any) => {
      const params = {
        id: value.id,
        idNotification: value.idNotification,
        title: value.title,
        content: value.content,
        timeStart: value.timeStart,
        timeEnd: value.timeEnd,
        color: value.color,
        location: value.location,
        url: value.url,
      }
      navigate("detailEventScreen", { itemDetail: params, key: value.timeStart })
    }

    const timelineProps: Partial<TimelineProps> = {
      format24h: true,
      scrollToFirst: true,
      start: 0,
      end: 24,
      unavailableHours: [
        { start: 0, end: 6 },
        { start: 22, end: 24 },
      ],
      overlapEventsSpacing: 8,
      rightEdgeSpacing: 24,
      onEventPress: handleNavigate,
      styles: {
        eventTimes: { color: "white" },
        eventTitle: { color: "white" },
        eventSummary: { color: "white", paddingTop: 4 },
        calendarBackground: colors.neutral100,
        agendaKnobColor: "red",
      },
    }

    return (
      <Screen style={$root} preset="fixed">
        <CalendarProvider
          key={languageStore.language}
          date={getDate()}
          // onDateChanged={this.onDateChanged}
          // onMonthChange={this.onMonthChange}
          //  disabledOpacity={0.6}
          // numberOfDays={3}
          theme={{ agendaKnobColor: "red" }}
        >
          <ExpandableCalendar
            firstDay={1}
            // leftArrowImageSource={require('../img/previous.png')}
            // rightArrowImageSource={require('../img/next.png')}
            //  markedDates={listEvents}
            markingType="multi-dot"
            theme={configs.THEME}
            hideKnob={false}
            key={languageStore.language}
          />
          <TimelineList
            events={listEvents}
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
