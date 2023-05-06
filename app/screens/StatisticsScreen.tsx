import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Header, Icon, Screen, Text, TextField, VectorsIcon } from "../components"
import { colors, colorsDefault } from "../theme"
import { BarChart, PieChart } from "react-native-chart-kit"
import { configs } from "../utils/configs"
import { translate } from "../i18n"
import { useStores } from "../models"
import { color } from "react-native-reanimated"
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
  function StatisticsScreen() {
    // Pull in one of our MST stores
    const { todoStore } = useStores()
    const [countTask, setCountTask] = useState<any>({})

    useEffect(() => {
      setCountTask(todoStore.getCountTaskNow())
      console.log("ok", todoStore.getCountTaskNow())
    }, [todoStore.isRefreshTodo])

    return (
      <Screen style={$root} preset="fixed">
        <Header
          backgroundColor={colors.neutral000}
          LeftActionComponent={
            <TextField
              placeholderTx="placeholderTask"
              containerStyle={{ width: "100%", paddingHorizontal: 16 }}
              inputWrapperStyle={{ alignItems: "center", justifyContent: "center" }}
              RightAccessory={() => (
                <TouchableOpacity hitSlop={$hitSlop}>
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
        <ScrollView>
          <View style={$container}>
            <Text preset="semibold" tx="tongquan" style={$textOverview} />
            <View style={$viewPie}>
              <PieChart
                data={[
                  {
                    name: translate("dahoanthanh"),
                    population: 100,
                    color: "#60c5a8",
                    legendFontColor: colors.neutral900,
                    legendFontSize: 12,
                  },
                  {
                    name: translate("trongquatrinh"),
                    population: 10,
                    color: "#637aff",
                    legendFontColor: colors.neutral900,
                    legendFontSize: 12,
                  },
                  {
                    name: translate("chuabatdau"),
                    population: 20,
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
                  decimalPlaces: 2, // optional, defaults to 2dp
                  color: (opacity = 1) => `red`,
                }}
                accessor={"population"}
                backgroundColor={"#FFF"}
                paddingLeft={"0"}
                style={{ justifyContent: "center", alignItems: "center" }}
                center={[0, 0]}
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
              />
              <View style={{ width: 16 }} />
              <ItemOverview
                typeIcon="Ionicons"
                nameIcon="md-today"
                labelTx="homnay"
                numTx="soluongnv"
                num={countTask.numberTaskNow}
                colorView={colorsDefault[0]}
              />
            </View>
            <View>
              <ItemStatistic
                typeIcon="Ionicons"
                nameIcon="checkmark-done-sharp"
                labelTx="dahoanthanh"
                num={3}
                colorView={colorsDefault[4]}
              />
              <ItemStatistic
                typeIcon="AntDesign"
                nameIcon="solution1"
                labelTx="trongquatrinh"
                num={5}
                colorView={colorsDefault[5]}
              />
              <ItemStatistic
                typeIcon="Entypo"
                nameIcon="sound-mute"
                labelTx="chuabatdau"
                num={3}
                colorView={colorsDefault[2]}
              />
            </View>
          </View>
        </ScrollView>
      </Screen>
    )
  },
)

const ItemOverview = ({ labelTx, numTx, num, typeIcon, nameIcon, colorView }: any) => {
  return (
    <TouchableOpacity style={$viewItemOverview}>
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

const ItemStatistic = ({ labelTx, typeIcon, nameIcon, num, colorView }: any) => {
  return (
    <TouchableOpacity style={[$viewRow, $viewBtn]}>
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
  color: colors.neutral900,
}
const $viewPie: ViewStyle = {
  borderRadius: 12,
  backgroundColor: colors.neutral000,
  alignItems: "center",
  padding: 12,
  ...configs.shadow,
  marginTop: 12,
}
const $viewItemOverview: ViewStyle = {
  flex: 1,
  backgroundColor: colors.neutral000,
  ...configs.shadow,
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
const $hitSlop: ViewStyle = {
  top: 10,
  right: 10,
  left: 10,
  bottom: 10,
}
const $viewRow: ViewStyle = { flexDirection: "row", marginTop: 16 }
const $viewBtn: ViewStyle = {
  backgroundColor: colors.neutral000,
  ...configs.shadow,
  borderRadius: 8,
  alignItems: "center",
  padding: 16,
}
