import React, { FC, useCallback } from "react"
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
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
  WeekCalendar,
  Calendar,
  CalendarList,
} from "react-native-calendars"
import DateRangePicker from "../utils/DateRangeConfigs.js"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Diary: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Diary" component={DiaryScreen} />`
// Hint: Look for the 🔥!
const agendaItems = [
  {
    title: "2023-04-01",
    data: [{ hour: "12am", duration: "1h", title: "First Yoga" }],
  },
  {
    title: "2023-04-05",
    data: [
      { hour: "4pm", duration: "1h", title: "Pilates ABC" },
      { hour: "5pm", duration: "1h", title: "Vinyasa Yoga" },
    ],
  },
  {
    title: "2023-04-10",
    data: [
      { hour: "1pm", duration: "1h", title: "Ashtanga Yoga" },
      { hour: "2pm", duration: "1h", title: "Deep Stretches" },
      { hour: "3pm", duration: "1h", title: "Private Yoga" },
    ],
  },
  {
    title: "2023-04-11",
    data: [{ hour: "12am", duration: "1h", title: "Ashtanga Yoga" }],
  },
  {
    title: "2023-04-09",
    data: [{}],
  },
  {
    title: "2023-04-12",
    data: [
      { hour: "9pm", duration: "1h", title: "Middle Yoga" },
      { hour: "10pm", duration: "1h", title: "Ashtanga" },
      { hour: "11pm", duration: "1h", title: "TRX" },
      { hour: "12pm", duration: "1h", title: "Running Group" },
    ],
  },
]
// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const DiaryScreen: FC<StackScreenProps<AppStackScreenProps, "Diary">> = observer(
  function DiaryScreen() {
    // Pull in one of our MST stores
    // const { someStore, anotherStore } = useStores()

    // Pull in navigation via hook
    // const navigation = useNavigation()

    const renderItem = useCallback(({ item }: any) => {
      return <ItemDiary />
    }, [])

    return (
      <Screen style={$root} preset="fixed">
        <Header titleTx="diary" backgroundColor={colors.neutral000} />

        <CalendarProvider
          date={agendaItems[1]?.title}
          // onDateChanged={(date) => console.log("date", date)}
          // onMonthChange={onMonthChange}
          showTodayButton
          // disabledOpacity={0.6}
          // theme={todayBtnTheme.current}
          // todayBottomMargin={16}
          theme={{
            "stylesheet.calendar.header": {
              header: {
                height: 0,
              },
              // week: {
              //       height: 0
              // }
            },
          }}
        >
          <ExpandableCalendar
            // horizontal={false}
            // hideArrows
           // disablePan
            // hideKnob
            // initialPosition={ExpandableCalendar.positions.OPEN}
            // calendarStyle={styles.calendar}
            // headerStyle={styles.header} // for horizontal only
            // disableWeekScroll
            // theme={theme.current}
            // // disableAllTouchEventsForDisabledDays
            firstDay={1}
            // markedDates={marked.current}
            // leftArrowImageSource={leftArrowIcon}
            // rightArrowImageSource={rightArrowIcon}
            //  animateScroll
            // closeOnDayPress={false}
          />
          <AgendaList
            sections={agendaItems}
            renderItem={renderItem}
            renderSectionHeader={(infor) => {
              return (
                <View style={$viewTitle}>
                  <Text preset="bold" style={$textTitle}>
                    {infor}
                  </Text>
                </View>
              )
            }}
            // scrollToNextEvent
            //  sectionStyle={$viewSection}
            dayFormat={"dd/MM/yyyy"}
            markToday={false}
          />
        </CalendarProvider>
        {/* <FlatList
          data={[1, 2, 3, 4]}
          renderItem={({ item }) => {
            return <ItemDiary />
          }}
        /> */}
      </Screen>
    )
  },
)

const ItemDiary = () => {
  return (
    <>
      {/* <View style={$viewTitle}>
        <Text preset="bold" style={$textTitle}>
          09/04/2023
        </Text>
      </View> */}
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
                data={[1, 2, 3, 4, 5, 6, 7, 8]}
                keyExtractor={(_, index) => `${index}`}
                scrollEventThrottle={16}
                renderItem={({ item, index }) => {
                  return (
                    <View onStartShouldSetResponder={() => true}>
                      <TouchableOpacity onPress={() => console.log("ok")}>
                        <View
                          style={{
                            height: 50,
                            width: 35,
                            backgroundColor: "red",
                            margin: 4,
                            borderRadius: 4,
                          }}
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

function renderCustomHeader(date: any) {
  const header = date.toString("MMMM yyyy")
  const [month, year] = header.split(" ")
  const textStyle: TextStyle = {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 10,
    paddingBottom: 10,
    color: "#5E60CE",
    paddingRight: 5,
  }

  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <Text style={{ marginLeft: 5 }}>{`${month}`}</Text>
      <Text style={{ marginRight: 5 }}>{year}</Text>
    </View>
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
  paddingHorizontal: 16,
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
const $container: ViewStyle = {}
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
  marginVertical: 12,
}
const $textTitle: TextStyle = {}
const $viewSection: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "red",
  width: "30%",
  borderRadius: 40,
}
