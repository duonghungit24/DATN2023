import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import lastDayOfDecade from "date-fns/fp/lastDayOfDecade/index"
import React, { useCallback, useRef } from "react"
import {
  Animated,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon, VectorsIcon, Text } from "../components"
import { WelcomeScreen, SettingScreen, SecurityScreen } from "../screens"
import { colors, spacing, typography } from "../theme"
import { configs } from "../utils/configs"
import { getActiveRouteName, navigationRef } from "./navigationUtilities"

export type DemoTabParamList = {
  homeScreen: undefined
  notificationScreen: undefined
  accountScreen: undefined
  settingScreen: undefined
  changllengeScreen: undefined
  addEmty: undefined
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
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
 
  const getIndex = (route) => {
   const dataRoute = ["homeScreen","notificationScreen","","changllengeScreen","settingScreen"]
   const index = dataRoute.findIndex((item) => item == route)
   return index
  }


  return (
  <>
 
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: $tabBar,
        tabBarLabelStyle: $tabBarLabel,
        tabBarShowLabel: false,
      }}
      screenListeners={{
        tabPress: (props) => {
          Animated.spring(tabOffsetValue, {
            toValue: (configs.windowWidth / 4 - 20) * getIndex(props.target.split("-")[0]) ,
            speed: 6,
            useNativeDriver: true
          }).start();
        },
      }}
     
    >
      <Tab.Screen
        name="homeScreen"
        component={WelcomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <ItemBottom
              focused={focused}
              typeIcon="AntDesign"
              nameIcon="calendar"
              labelTx="lich"
            />
          ),
        }}
      />
      <Tab.Screen
        name="notificationScreen"
        component={WelcomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <ItemBottom
              focused={focused}
              typeIcon="AntDesign"
              nameIcon="exception1"
              labelTx="quanly"
            />
          ),
        }}
      />
      <Tab.Screen
        name="addEmty"
        component={EmptyScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <VectorsIcon
              type="AntDesign"
              name="plus"
              color={focused ? colors.neutral000 : colors.neutral000}
              size={28}
            />
          ),
          tabBarButton: (props) => <ButtonAdd {...props} />,
        }}
      />
      <Tab.Screen
        name="changllengeScreen"
        component={WelcomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <ItemBottom
              focused={focused}
              typeIcon="FontAwesome5"
              nameIcon="cloudscale"
              labelTx="thuthach"
            />
          ),
        }}
      />
      <Tab.Screen
        name="settingScreen"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <ItemBottom
              focused={focused}
              typeIcon="MaterialIcons"
              nameIcon="settings"
              labelTx="caidat"
            />
          ),
        }}
      />
    </Tab.Navigator>
      <Animated.View style={{
        width: configs.windowWidth/4 - 20,
        height: 2,
        backgroundColor: 'red',
        position: 'absolute',
        bottom: 60,
        // Horizontal Padding = 20...
        left: 0,
        borderRadius: 20,
        transform: [
          { translateX: tabOffsetValue }
        ]
      }}>
      </Animated.View>
      </>
  )
}

const ItemBottom = ({ typeIcon, nameIcon, labelTx, focused }: any) => {
  const $textFocused = focused ? [$tabBarLabel, {color: colors.primary500}] : $tabBarLabel
  return (
    <View style={$viewItem}>
      <VectorsIcon
        type={typeIcon}
        name={nameIcon}
        size={25}
        color={focused ? colors.primary500 : colors.border}
      />
      <Text tx={labelTx} style={$textFocused} />
    </View>
  )
}

const ButtonAdd = ({ children }) => {
  return (
    <TouchableOpacity onPress={() => console.log("ok")} style={$btnAdd} activeOpacity={0.9}>
      {children}
    </TouchableOpacity>
  )
}

function EmptyScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    </View>
  );
}

const $tabBar: ViewStyle = {
  backgroundColor: colors.neutral000,
  borderTopColor: colors.transparent,
  ...configs.shadow,
  height: 60,
  justifyContent: "center",
}
const $viewItem: ViewStyle = {
  alignItems: "center",
}
const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  color: colors.neutral500,
  lineHeight: 0,
  marginTop: 4
}
const $btnAdd: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "red",
  top: -30,
  width: 60,
  height: 60,
  borderRadius: 30,
  ...configs.shadow,
}
