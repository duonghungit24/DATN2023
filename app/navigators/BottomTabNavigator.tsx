import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon, VectorsIcon } from "../components"
import { translate } from "../i18n"
import { WelcomeScreen , SettingScreen} from "../screens"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"

export type DemoTabParamList = {
  homeScreen: undefined
  notificationScreen: undefined
  accountScreen: undefined
  settingScreen: undefined
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
        tabBarStyle: [$tabBar, { height: bottom + 60 }],
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
          tabBarLabel: "Trang chủ",
          tabBarIcon: ({ focused }) => <VectorsIcon type="Feather" name="home" size={25} color={focused ? colors.primary500 : colors.border} />,
        }}
      />

      {/* <Tab.Screen
        name="notificationScreen"
        component={WelcomeScreen}
        options={{
          tabBarLabel: "Thông báo",
          tabBarIcon: ({ focused }) => <VectorsIcon type="Feather" name="bell" size={25} color={focused ? colors.primary500 : colors.border} />,
        }}
      /> */}

      <Tab.Screen
        name="settingScreen"
        component={SettingScreen}
        options={{
          tabBarLabel: "Cài đặt",
          tabBarIcon: ({ focused }) => <VectorsIcon type="Ionicons" name="person" size={25} color={focused ? colors.primary500 : colors.border} />,
        }}
      />
    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.neutral100,
  borderTopColor: colors.transparent,
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.medium,
}

const $tabBarLabel: TextStyle = {
  fontSize: 10,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}
