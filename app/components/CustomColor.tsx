import React, { useState } from "react"
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import { TextField } from "./TextField"
import { LeftAccesstory } from "./ModalCreateDiary"

export interface CustomColorProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  onPressCustom: () => void
  onPressColor: (value) => void
  listColor: any
  color: string
}

/**
 * Describe your component here
 */
export const CustomColor = observer(function CustomColor(props: CustomColorProps) {
  const { style, onPressCustom, onPressColor, listColor = [], color } = props
  const $styles = [$container, style]
  return (
    <View style={$styles}>
      <TextField
        LeftAccessory={() => (
          <LeftAccesstory
            typeIcon="MaterialIcons"
            nameIcon="color-lens"
            colorIcon={colors.primary500}
          />
        )}
        placeholderTx="tuychon"
        inputWrapperStyle={$wrapInput}
        containerStyle={{ flex: 1 }}
        style={{ ...typography.textBold }}
        placeholderTextColor={colors.neutral900}
        editable={false}
        onPressIn={onPressCustom}
        // RightAccessory={() => (
        //   <LeftAccesstory
        //     typeIcon="Feather"
        //     nameIcon="chevron-right"
        //     colorIcon={colors.neutral500}
        //   />
        // )}
      />
      <View style={$viewRowColor}>
        {listColor.map((el, index) => {
          const $colorSelect =
            color == el
              ? [$viewCircleAtive, { borderColor: colors.primary500, borderWidth: 2 }]
              : $viewCircleAtive
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={1}
              onPress={() => {
                onPressColor(el)
              }}
              style={$colorSelect}
            >
              <View style={[$viewColor, { backgroundColor: el }]} />
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
})

const $container: ViewStyle = {}

const $wrapInput: ViewStyle = {
  borderWidth: 0,
  backgroundColor: colors.neutral000,
  alignItems: "center",
}
const $viewRowColor: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-evenly",
  marginVertical: 8,
}
const $viewColor: ViewStyle = {
  height: 18,
  width: 18,
  borderRadius: 10,
}
const $viewCircleAtive: ViewStyle = {
  backgroundColor: colors.neutral000,
  height: 25,
  width: 25,
  borderRadius: 25,
  alignItems: "center",
  justifyContent: "center",
}
