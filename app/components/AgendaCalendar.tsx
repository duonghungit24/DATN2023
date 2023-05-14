import React, { useEffect, useLayoutEffect, useState } from "react"
import { Pressable, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import { Agenda, AgendaEntry, AgendaSchedule, LocaleConfig } from "react-native-calendars"
import { useStores } from "../models"
import { hourPickerLocales } from "../utils/localeDate"
import { navigate } from "../navigators"
import { utils } from "../utils"
import { ListEmpty } from "./ListEmty"
import { toJS } from "mobx"

export interface AgendaCalendarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  onPressDate: (value) => void
}
/**
 * Describe your component here
 */
LocaleConfig.locales["vi"] = hourPickerLocales["vi"]
LocaleConfig.locales["en"] = hourPickerLocales["en"]
LocaleConfig.locales["ja"] = hourPickerLocales["ja"]
LocaleConfig.locales["ko"] = hourPickerLocales["ko"]
export const AgendaCalendar = observer(function AgendaCalendar(props: AgendaCalendarProps) {
  const { style, onPressDate } = props
  const $styles = [$container, style]

  const { languageStore, todoStore } = useStores()
  const [listTask, setListTask] = useState({})

  LocaleConfig.defaultLocale = languageStore.language

  useLayoutEffect(() => {
    setListTask(todoStore.getListTodo())
  }, [todoStore.isRefreshTodo])

  const renderItem = (reservation: any, isFirst: boolean) => {
    return (
      <Pressable
        style={[$viewItem, { borderLeftColor: reservation.color }]}
        onPress={() =>
          navigate("detailTodoScreen", { itemTodo: toJS(reservation), key: reservation.time })
        }
      >
        <Text preset="medium" style={$textTime}>
          {utils.hoursAndMinutes(reservation.time)}
        </Text>
        <Text preset="semibold" style={$title}>
          {reservation.title}
        </Text>
        {reservation.content ? (
          <Text preset="regular" style={$text}>
            {reservation.content}
          </Text>
        ) : null}
      </Pressable>
    )
  }
  return (
    <View style={$styles}>
      <Agenda
        key={languageStore.language}
        items={listTask}
        keyExtractor={(_, index) => `${index}`}
        renderItem={renderItem}
        date={new Date().toISOString()}
        selected={utils.displayDateCalendar(new Date())}
        showOnlySelectedDayItems={true}
        reservationsKeyExtractor={(item, index) => {
          return `${item?.reservation?.time}${index}`
        }}
        refreshing={true}
        // Callback that gets called when items for a certain month should be loaded (month became visible)
        // loadItemsForMonth={(month) => {
        //   console.log("trigger items loading")
        // }}
        // // Callback that fires when the calendar is opened or closed
        // onCalendarToggled={(calendarOpened) => {
        //   console.log(calendarOpened)
        // }}
        // // Callback that gets called on day press
        onDayPress={(day) => {
          onPressDate(utils.convertDigitInDate(day.dateString))
        }}
        // onDayChange={(day) => {
        //   onPressDate(utils.convertDigitInDate(day.dateString))
        // }}
        // // Callback that gets called when day changes while scrolling agenda list
        // onDayChange={(day) => {
        //   console.log("day changed")
        // }}
        // // Initially selected day
        // selected={"2012-05-16"}
        // // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        // minDate={"2012-05-01"}
        // // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        // maxDate={"2022-06-30"}
        // // Max amount of months allowed to scroll to the past. Default = 50
        // pastScrollRange={50}
        // // Max amount of months allowed to scroll to the future. Default = 50
        // futureScrollRange={50}
        // // Specify how each item should be rendered in agenda
        // renderItem={(item, firstItemInDay) => {
        //   console.log("item", firstItemInDay)
        //   return (
        //     <TouchableOpacity style={{height: 20}}>
        //     <Text style={{color: "red"}}>{item.name}</Text>
        //   </TouchableOpacity>
        //   )
        // }}
        // // Specify how each date should be rendered. day can be undefined if the item is not first in that day
        // renderDay={(day, item) => {
        //   return <View style={{height: 50,w , backgroundColor: "red"}}/>
        // }}
        // // Specify how empty date content with no items should be rendered
        // renderEmptyDate={() => {
        //   return <View />
        // }}
        // // Specify how agenda knob should look like
        // renderKnob={() => {
        //   return <View />
        // }}
        // // Override inner list with a custom implemented component
        // // Specify what should be rendered instead of ActivityIndicator
        renderEmptyData={() => <ListEmpty />}
        // // Specify your item comparison function for increased performance
        rowHasChanged={(r1, r2) => {
          return true
        }}
        // // Hide knob button. Default = false
        // hideKnob={true}
        // // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
        // showClosingKnob={false}
        // // By default, agenda dates are marked if they have at least one item, but you can override this if needed
        // markedDates={{
        //   "2023-05-20": { marked: true },
        //   "2023-05-17": { marked: true },
        //   "2023-05-18": { disabled: false },
        // }}
        // // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
        // disabledByDefault={false}
        // // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
        // onRefresh={() => console.log("refreshing...")}
        // // Set this true while waiting for new data from a refresh
        // refreshing={true}
        // // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
        // refreshControl={null}
        // // Agenda theme
        theme={{
          agendaDayTextColor: colors.secondary400,
          agendaDayNumColor: colors.secondary500,
          agendaTodayColor: colors.primary500,
          todayTextColor: colors.primary500,
          agendaKnobColor: colors.primary500,
          selectedDayBackgroundColor: colors.primary500,
          dotColor: colors.primary500,
        }}
        // // Agenda container style
        // style={{ }}
        // theme={{
        //   backgroundColor: '#f1f2f6',
        //   calendarBackground: '#ffffff',
        //   textSectionTitleColor: '#b6c1cd',
        //   selectedDayBackgroundColor: '#fff',
        //   selectedDayTextColor: "red",
        //   todayTextColor: '#00adf5',
        //   dayTextColor: '#2d4150',
        //   textDisabledColor: '#d9e1e8',
        //   dotColor: '#00adf5',
        //   selectedDotColor: '#ffffff',
        //   arrowColor: 'orange',
        //   monthTextColor: "red",
        //   indicatorColor: 'blue',
        //   textDayFontWeight: '300',
        //   textMonthFontWeight: 'bold',
        //   textDayHeaderFontWeight: '300',
        //   textDayFontSize: 20,
        //   textMonthFontSize: 17,
        //   textDayHeaderFontSize: 17,
        //   agendaDayTextColor: 'yellow',
        //   agendaDayNumColor: 'green',
        //   agendaTodayColor: 'red',
        //   agendaKnobColor: 'red',
        // }}
      />
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
}
const $viewItem: ViewStyle = {
  backgroundColor: colors.neutral000,
  borderRadius: 5,
  padding: 10,
  marginRight: 10,
  marginTop: 16,
  borderLeftWidth: 3,
  borderLeftColor: "#2d4150",
}
const $title: TextStyle = { fontSize: 14, color: colors.neutral900, marginTop: 4 }
const $text: TextStyle = { fontSize: 14, color: colors.neutral700, marginTop: 4 }
const $textTime: TextStyle = { color: colors.neutral600, fontSize: 14 }
