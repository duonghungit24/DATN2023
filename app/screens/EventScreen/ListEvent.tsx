import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { Text, VectorsIcon } from "../../components"
import { colors } from "../../theme"
import { configs } from "../../utils/configs"

export const ListEvent = observer(() => {
  const listEvent = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  console.log("oinde", listEvent.length)
  return (
    <>
      {listEvent.map((item, index) => {
        console.log("index", index)
        return (
          <View key={index} style={{ flexDirection: "row", paddingHorizontal: 16 }}>
            <ItemLine  currentIndex={index} lengthEvent={listEvent.length - 1} />
            <ItemEvent />
          </View>
        )
      })}
    </>
  )
})

const ItemLine = ({ currentIndex, lengthEvent }) => {
  return (
    <View
      style={{ width: "10%", height: "100%", alignItems: "center", position: "absolute", top: 50 }}
    >
      <VectorsIcon type="AntDesign" name="checkcircle" color="red" size={20} style={{ paddingBottom: 8 }} />
      {lengthEvent != currentIndex ? <View style={$line} /> : null}
    </View>
  )
}
const ItemEvent = () => {
  return (
    <View style={$viewItemEvent}>
      <View style={$lineHeight} />
      <View style={$viewItemRight}>
        <Text>02:56 - 03:56</Text>
        <Text preset="bold" style={$nameEvent}>
          Event 1
        </Text>
        <Text preset="regular" style={$nameDescription}>
          hushushushuhu
        </Text>
      </View>
      <View>
        <VectorsIcon type="Feather" name="search" />
      </View>
    </View>
  )
}

const $viewItemEvent: ViewStyle = {
  flexDirection: "row",
  backgroundColor: colors.neutral000,
  alignItems: "center",
  ...configs.shadow,
  marginTop: 16,
  paddingVertical: 12,
  paddingHorizontal: 8,
  width: "94%",
  borderRadius: 12,
  left: "6%",
}
const $lineHeight: ViewStyle = {
  width: 3,
  height: "100%",
  backgroundColor: "red",
  borderRadius: 30,
}
const $viewItemRight: ViewStyle = {
  flex: 1,
  marginLeft: 12,
}
const $nameEvent: TextStyle = {
  color: colors.neutral900,
}
const $nameDescription: TextStyle = {
  color: colors.neutral700,
}
const $line: ViewStyle = {
  backgroundColor: "blue",
  width: 1,
  height: "70%",
}
