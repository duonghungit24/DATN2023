import React from "react"
import { View, TouchableOpacity, ViewStyle, TextStyle } from "react-native"
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message"
import { Text, VectorsIcon } from "../components"
import { TxKeyPath } from "../i18n"
import { colors, typography } from "../theme"
import { configs } from "./configs"

export interface ToastProps {
  text1?: string
  text2?: string
  type: "success" | "error" | "warning" | "tomatoToast" | "addGoods"
  position?: "top" | "bottom"
  autoHide?: boolean
  visibilityTime?: number
  topOffset?: number
  bottomOffset?: number
  keyboardOffset?: number
  onShow?: () => void
  onHide?: () => void
  onPress?: () => void
  props?: any
}

// API  https://github.com/calintamas/react-native-toast-message/blob/main/docs/api.md

/*
  1. Create the config
*/

export const toastConfig = {
  success: ({ text1, text2, onPress }: ToastProps) => (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={$btnToast}>
      <VectorsIcon type="MaterialIcons" name="check-circle" size={25} color={colors.success} />
      <View style={$content}>
        {text1 ? (
          <Text preset="bold" style={$text1}>
            {text1}
          </Text>
        ) : null}
        {text2 ? (
          <Text preset="regular" style={$text2}>
            {text2}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  ),
  error: ({ text1, text2, onPress }: ToastProps) => (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={$btnToast}>
      <VectorsIcon type="MaterialIcons" name="error" size={25} color={colors.error} />
      <View style={$content}>
        {text1 ? (
          <Text preset="bold" style={$text1}>
            {text1}
          </Text>
        ) : null}
        {text2 ? (
          <Text preset="regular" style={$text2}>
            {text2}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  ),
  warning: ({ text1, text2, onPress }: ToastProps) => (
    <TouchableOpacity activeOpacity={0.2} onPress={onPress} style={$btnToast}>
      <VectorsIcon type="MaterialIcons" name="warning" size={25} color={colors.accent500} />
      <View style={$content}>
        {text1 ? (
          <Text preset="bold" style={$text1}>
            {text1}
          </Text>
        ) : null}
        {text2 ? (
          <Text preset="regular" style={$text2}>
            {text2}
          </Text>
        ) : null}
      </View>
    </TouchableOpacity>
  ),
} as any

const $btnToast: ViewStyle = {
  minHeight: 60,
  width: "90%",
  paddingHorizontal: 12,
  alignItems: "center",
  backgroundColor: "#2D3748",
  borderRadius: 4,
  padding: 6,
  flexDirection: "row",
  ...configs.shadow,
  zIndex: 10,
}
const $text1: TextStyle = {
  fontSize: 14,
  color: colors.neutral000,
}
const $text2: TextStyle = {
  fontSize: 14,
  color: colors.neutral000,
}
const $content: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  paddingLeft: 10,
}
