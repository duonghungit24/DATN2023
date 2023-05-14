import React, { FC, useEffect, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { Insets, ScrollView, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../../navigators"
import { Header, Icon, Screen, Text, TextField, VectorsIcon } from "../../components"
import { colors, colorsDefault } from "../../theme"
import { BarChart, PieChart } from "react-native-chart-kit"
import { configs } from "../../utils/configs"
import { translate } from "../../i18n"
import { useStores } from "../../models"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Statistics: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Statistics" component={StatisticsScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const StatisticsScreen: FC<StackScreenProps<AppStackScreenProps, "Statistics">> = observer(
  function StatisticsScreen({ navigation }) {
    // Pull in one of our MST stores
    const { todoStore } = useStores()
    const [countTask, setCountTask] = useState<any>({})
    const [countStatus, setCountStatus] = useState<any>({
      statusDone: 0,
      statusDoing: 0,
      statusExpired: 0,
    })
    const [textSearch, setTextSearch] = useState("")

    useEffect(() => {
      setCountTask(todoStore.getCountTaskNow())
      setCountStatus(todoStore.getNumberStatusTask())
    }, [todoStore.isRefreshTodo])

    return (
      <Screen style={$root} preset="fixed">
        <Header
          backgroundColor={colors.neutral000}
          LeftActionComponent={
            <TextField
              value={textSearch}
              onChangeText={setTextSearch}
              placeholderTx="placeholderTask"
              containerStyle={{ width: "100%", paddingHorizontal: 16 }}
              inputWrapperStyle={{ alignItems: "center", justifyContent: "center" }}
              RightAccessory={() => (
                <TouchableOpacity
                  hitSlop={$hitSlop}
                  onPress={() => navigation.navigate("resultSearchScreen", { textSearch })}
                  activeOpacity={0.8}
                >
                  <VectorsIcon
                    type="Feather"
                    name="search"
                    color={colors.neutral900}
                    size={20}
                    style={{ marginRight: 12 }}
                  />
                </TouchableOpacity>
              )}
            />
          }
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={$container}>
            <Text preset="semibold" tx="tongquan" style={$textOverview} />
            <View style={$viewPie}>
              <PieChart
                hasLegend={true}
                data={[
                  {
                    name: translate("dahoanthanh"),
                    population: countStatus.statusDone,
                    color: "#60c5a8",
                    legendFontColor: colors.neutral900,
                    legendFontSize: 12,
                  },
                  {
                    name: translate("trongquatrinh"),
                    population: countStatus.statusDoing,
                    color: "#637aff",
                    legendFontColor: colors.neutral900,
                    legendFontSize: 12,
                  },
                  {
                    name: translate("chuabatdau"),
                    population: countStatus.statusExpired,
                    color: colors.angry100,
                    legendFontColor: colors.neutral900,
                    legendFontSize: 12,
                  },
                ]}
                width={configs.windowWidth - 60}
                height={180}
                chartConfig={{
                  backgroundColor: "#e26a00",
                  backgroundGradientFrom: "#fb8c00",
                  backgroundGradientTo: "#ffa726",
                  backgroundGradientToOpacity: 0.5,
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                center={[0, 0]}
                accessor={"population"}
                backgroundColor={"#FFF"}
                paddingLeft={"0"}
                style={{ justifyContent: "center", alignItems: "center" }}
              />
            </View>
            <View style={$viewRow}>
              <ItemOverview
                typeIcon="MaterialCommunityIcons"
                nameIcon="ballot"
                labelTx="tatca"
                numTx="soluongnv"
                num={countTask.numberTaskAll}
                colorView={colorsDefault[3]}
                onPressDetail={() => navigation.navigate("resultStatusTodoScreen", { type: "all" })}
              />
              <View style={{ width: 16 }} />
              <ItemOverview
                typeIcon="Ionicons"
                nameIcon="md-today"
                labelTx="homnay"
                numTx="soluongnv"
                num={countTask.numberTaskNow}
                colorView={colorsDefault[0]}
                onPressDetail={() => navigation.navigate("resultStatusTodoScreen", { type: "now" })}
              />
            </View>
            <View>
              <ItemStatistic
                typeIcon="Ionicons"
                nameIcon="checkmark-done-sharp"
                labelTx="dahoanthanh"
                num={countStatus.statusDone}
                colorView={colorsDefault[4]}
                onPressDetail={() =>
                  navigation.navigate("resultStatusTodoScreen", { type: "done" })
                }
              />
              <ItemStatistic
                typeIcon="AntDesign"
                nameIcon="solution1"
                labelTx="trongquatrinh"
                num={countStatus.statusDoing}
                colorView={colorsDefault[5]}
                onPressDetail={() =>
                  navigation.navigate("resultStatusTodoScreen", { type: "doing" })
                }
              />
              <ItemStatistic
                typeIcon="Entypo"
                nameIcon="sound-mute"
                labelTx="chuabatdau"
                num={countStatus.statusExpired}
                colorView={colorsDefault[2]}
                onPressDetail={() =>
                  navigation.navigate("resultStatusTodoScreen", { type: "expired" })
                }
              />
            </View>
          </View>
        </ScrollView>
      </Screen>
    )
  },
)

const ItemOverview = ({
  labelTx,
  numTx,
  num,
  typeIcon,
  nameIcon,
  colorView,
  onPressDetail,
}: any) => {
  return (
    <TouchableOpacity style={$viewItemOverview} onPress={onPressDetail}>
      <View style={[$viewIcon, { backgroundColor: colorView }]}>
        <VectorsIcon type={typeIcon} name={nameIcon} size={25} color={colors.neutral000} />
      </View>
      <Text
        preset="medium"
        tx={labelTx}
        style={{ fontSize: 14, color: colors.neutral900, marginTop: 12 }}
      />
      <Text
        preset="regular"
        tx={numTx}
        txOptions={{ num: num }}
        style={{ fontSize: 12, color: colors.neutral700, marginTop: 4 }}
      />
    </TouchableOpacity>
  )
}

const ItemStatistic = ({ labelTx, typeIcon, nameIcon, num, colorView, onPressDetail }: any) => {
  return (
    <TouchableOpacity style={[$viewRow, $viewBtn]} onPress={onPressDetail}>
      <View style={[$viewIcon, { backgroundColor: colorView }]}>
        <VectorsIcon type={typeIcon} name={nameIcon} size={25} color={colors.neutral000} />
      </View>
      <View style={{ marginLeft: 12 }}>
        <Text preset="medium" tx={labelTx} />
        <Text
          preset="regular"
          tx="soluongnv"
          txOptions={{ num: num }}
          style={{ fontSize: 12, color: colors.neutral700, marginTop: 4 }}
        />
      </View>
    </TouchableOpacity>
  )
}

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}
const $container: ViewStyle = {
  flex: 1,
  paddingHorizontal: 16,
}
const $textOverview: TextStyle = {
  marginTop: 12,
  fontSize: 20,
  color: colors.neutral700,
}
const $viewPie: ViewStyle = {
  borderRadius: 12,
  backgroundColor: colors.neutral000,
  alignItems: "center",
  padding: 12,
  // ...configs.shadow,
  marginTop: 12,
}
const $viewItemOverview: ViewStyle = {
  flex: 1,
  backgroundColor: colors.neutral000,
  // ...configs.shadow,

  height: configs.windowHeight * 0.2,
  borderRadius: 12,
  padding: 16,
}
const $viewIcon: ViewStyle = {
  width: 40,
  height: 40,
  borderRadius: 30,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.angry100,
}
const $hitSlop: Insets = {
  top: 10,
  right: 10,
  left: 10,
  bottom: 10,
}
const $viewRow: ViewStyle = { flexDirection: "row", marginTop: 16 }
const $viewBtn: ViewStyle = {
  backgroundColor: colors.neutral000,
  // ...configs.shadow,
  borderRadius: 8,
  alignItems: "center",
  padding: 16,
}
