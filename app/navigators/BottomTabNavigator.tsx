import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon, VectorsIcon } from "../components"
import { translate } from "../i18n"
import { WelcomeScreen, SettingScreen } from "../screens"
import { colors, spacing, typography } from "../theme"
import { configs } from "../utils/configs"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

export type DemoTabParamList = {
  homeScreen: undefined
  notificationScreen: undefined
  accountScreen: undefined
  settingScreen: undefined
  changllengeScreen: undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
// export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
//   BottomTabScreenProps<DemoTabParamList, T>,
//   AppStackScreenProps<keyof AppStackParamList>
// >

const Tab = createBottomTabNavigator<DemoTabParamList>()

export function BottomTabNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar],
        tabBarActiveTintColor: colors.primary500,
        tabBarInactiveTintColor: colors.border,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      <Tab.Screen
        name="homeScreen"
        component={WelcomeScreen}
        options={{
          tabBarLabel: "Lịch",
          tabBarIcon: ({ focused }) => (
            <VectorsIcon
              type="AntDesign"
              name="calendar"
              size={25}
              color={focused ? colors.primary500 : colors.border}
            />
          ),
        }}
      />

      <Tab.Screen
        name="notificationScreen"
        component={WelcomeScreen}
        options={{
          tabBarLabel: "Quản lý",
          tabBarIcon: ({ focused }) => (
            <VectorsIcon
              type="AntDesign"
              name="exception1"
              size={25}
              color={focused ? colors.primary500 : colors.border}
            />
          ),
        }}
      />

      <Tab.Screen
        name="changllengeScreen"
        component={WelcomeScreen}
        options={{
          tabBarLabel: "Thử thách",
          tabBarIcon: ({ focused }) => (
            <VectorsIcon
              type="FontAwesome5"
              name="balance-scale"
              size={25}
              color={focused ? colors.primary500 : colors.border}
            />
          ),
        }}
      />

      <Tab.Screen
        name="settingScreen"
        component={SettingScreen}
        options={{
          tabBarLabel: "Cài đặt",
          tabBarIcon: ({ focused }) => (
            <VectorsIcon
              type="MaterialIcons"
              name="settings"
              size={25}
              color={focused ? colors.primary500 : colors.border}
            />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.neutral000,
  borderTopColor: colors.transparent,
  ...configs.shadow,
  height: 60,
  alignContent: "center"
}

const $tabBarItem: ViewStyle = {
    bottom: 0
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  flex: 1
}
