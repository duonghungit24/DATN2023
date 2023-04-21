import * as React from "react"
import { Pressable, StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import { Agenda, AgendaEntry, AgendaSchedule, LocaleConfig } from "react-native-calendars"
import { useStores } from "../models"
import { hourPickerLocales } from "../utils/localeDate"
import { navigate } from "../navigators"


export interface AgendaCalendarProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}
const data = {
  "2022-11-23": [],
  "2023-03-19": [
    {
      "id": "1",
      "name": "Live: notJust.Hack Kickstart",
      "height": 50,
      "day": "2022-11-24"
    }
  ],
  "2023-03-20": [
    {
      "id": "2",
      "name": "Workshop: Build any mobile application with React Native",
      "height": 50,
      "day": "2022-11-25"
    },
    {
      "id": "3",
      "name": "Q&A session",
      "height": 50,
      "day": "2022-11-25"
    }
  ],
  "2023-03-24": [
    {
      "id": "4",
      "name": "Workshop: Build a Chat application in hours using Stream",
      "height": 50,
      "day": "2022-11-26"
    },
    {
      "id": "5",
      "name": "Q&A session",
      "height": 50,
      "day": "2022-11-26"
    }
  ],
  "2023-03-22": [
    {
      "id": "6",
      "name": "Workshop: Build Full-Stack applications with Nhost",
      "height": 50,
      "day": "2022-11-27"
    },
    {
      "id": "7",
      "name": "Q&A session",
      "height": 50,
      "day": "2022-11-27"
    }
  ],
  "2023-03-23": [
    {
      "id": "8",
      "name": "Demo Day",
      "height": 50,
      "day": "2022-11-28"
    }
  ]
}
/**
 * Describe your component here
 */
LocaleConfig.locales['vi'] = hourPickerLocales['vi'];
LocaleConfig.locales['en'] = hourPickerLocales['en'];
LocaleConfig.locales['ja'] = hourPickerLocales['ja'];
LocaleConfig.locales['ko'] = hourPickerLocales['ko'];
export const AgendaCalendar = observer(function AgendaCalendar(props: AgendaCalendarProps) {
  const { style } = props
  const {languageStore }  = useStores()
  const $styles = [$container, style]
  LocaleConfig.defaultLocale = languageStore.language

 
//   const timeToString = (time) => {
//     const date = new Date(time);
//     return date.toISOString().split('T')[0];
// }

//     const [items, setItems] = React.useState({});

//     const loadItems = (day) => {

//         setTimeout(() => {
//             for (let i = -15; i < 85; i++) {
//                 const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//                 const strTime = timeToString(time);

//                 if (!items[strTime]) {
//                     items[strTime] = [];

//                     const numItems = Math.floor(Math.random() * 1 + 1);
//                     for (let j = 0; j < numItems; j++) {
//                         items[strTime].push({
//                             name: 'Add your Agenda',
//                             height: Math.max(10, Math.floor(Math.random() * 150)),
//                             day: strTime
//                         });
//                     }
//                 }
//             }
//             const newItems = {};
//             Object.keys(items).forEach(key => {
//                 newItems[key] = items[key];
//             });
//             setItems(newItems);
//         }, 1000);
//     }
const renderItem = (reservation: AgendaEntry, isFirst: boolean) => {
  const fontSize = isFirst ? 16 : 14;
  const color = isFirst ? "black" : "#43515c";
  return (
    <Pressable
      style={[$item, { height: reservation.height }]}
      onPress={() => navigate("statisticsScreen") }
    >
      <Text style={{ fontSize, color }}>{reservation.name}</Text>
    </Pressable>
  );
};
  return (
    <View style={$styles}>
      <Agenda
       key={languageStore.language}
        // The list of items that have to be displayed in agenda. If you want to render item as empty date
        // the value of date key has to be an empty array []. If there exists no value for date key it is
        // considered that the date in question is not yet loaded
        items={data}
        renderItem={renderItem}
        selected="2023-03-20"
      
        // Callback that gets called when items for a certain month should be loaded (month became visible)
        // loadItemsForMonth={(month) => {
        //   console.log("trigger items loading")
        // }}
        // // Callback that fires when the calendar is opened or closed
        // onCalendarToggled={(calendarOpened) => {
        //   console.log(calendarOpened)
        // }}
        // // Callback that gets called on day press
        // onDayPress={(day) => {
        //   console.log("day pressed")
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
        //   return <View />
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
        // renderList={(listProps) => {
          
        //   return  <TouchableOpacity style={{height: 20}}>
        //   <Text style={{color: "red"}}>{1}</Text>
        // </TouchableOpacity>
        // }}
        // // Specify what should be rendered instead of ActivityIndicator
        // renderEmptyData={() => {
        //   return <View />
        // }}
        // // Specify your item comparison function for increased performance
        // rowHasChanged={(r1, r2) => {
        //   console.log(console.log("r1", r1))
        //    return r1.name !== r2.name
        // }}
        // // Hide knob button. Default = false
        // hideKnob={true}
        // // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
        // showClosingKnob={false}
        // // By default, agenda dates are marked if they have at least one item, but you can override this if needed
        // markedDates={{
        //   "2012-05-16": { marked: true },
        //   "2012-05-17": { marked: true },
        //   "2012-05-18": { disabled: false },
        // }}
        // // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
        // disabledByDefault={false}
        // // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
        // onRefresh={() => console.log("refreshing...")}
        // // Set this true while waiting for new data from a refresh
        // refreshing={false}
        // // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
        // refreshControl={null}
        // // Agenda theme
        // theme={{
        //   agendaDayTextColor: "yellow",
        //   agendaDayNumColor: "green",
        //   agendaTodayColor: "red",
        //   agendaKnobColor: "blue",
        // }}
 
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
const $item:ViewStyle = {
  backgroundColor: "white",
  flex: 1,
  borderRadius: 5,
  padding: 10,
  marginRight: 10,
  marginTop: 17,
}
