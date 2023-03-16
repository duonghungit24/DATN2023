import { observer } from "mobx-react-lite"
import moment from "moment"
import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import {
  AgendaCalendar,
  Button,
  Header,
  Text, VectorsIcon,
} from "../components"
import { isRTL } from "../i18n"
import { useStores } from "../models"
import { colors, spacing } from "../theme"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

const welcomeLogo = require("../../assets/images/logo.png")
const welcomeFace = require("../../assets/images/welcome-face.png")


export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
) {

  const { languageStore} = useStores()
  console.log(languageStore.language)
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])
  console.log(moment().format())

  return (
    <View style={$container}>
      <Header backgroundColor={colors.neutral000} />
       <AgendaCalendar />
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.neutral000,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.large,
  justifyContent: "space-around",
}
const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.huge,
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.medium,
}
