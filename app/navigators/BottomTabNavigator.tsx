import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { NavigationContainer } from "@react-navigation/native"
import lastDayOfDecade from "date-fns/fp/lastDayOfDecade/index"
import { onSnapshot } from "mobx-state-tree"
import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"
import {
  Animated,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import {  VectorsIcon, Text, ModalChoosePlan } from "../components"
import { translate } from "../i18n"
import { useStores } from "../models"
import { ManagementScreen, SettingScreen, TodoScreen, MemoScreen, ChangllengeScreen, StatisticsScreen } from "../screens"
import { colors, spacing, typography } from "../theme"
import { configs } from "../utils/configs"

export type DemoTabParamList = {
  manageScreen: undefined
  workScreen: undefined
  settingScreen: undefined
  statisticScreen: undefined
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
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const [isVisible, setIsvisible] = useState(false)
  const { languageStore } = useStores()
  const [refresh, setRefresh] = useState(false)
  useEffect(() => {
    onSnapshot(languageStore, (snap) => {
      setRefresh(!refresh)
    })
  }, [languageStore.language])


 
  const getIndex = (route) => {
   const dataRoute = ["statisticScreen","workScreen","","manageScreen","settingScreen"]
   const index = dataRoute.findIndex((item) => item == route)
   return index
  }


  return (
  <>
    <ModalChoosePlan isVisible={isVisible} onBackDropPress={() => setIsvisible(false)} />
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
        name="statisticScreen"
        component={StatisticsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <ItemBottom
              focused={focused}
              typeIcon="AntDesign"
              nameIcon="calendar"
              labelTx="thongke"
            />
          ),
        }}
      />
      <Tab.Screen
        name="workScreen"
        component={TodoScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <ItemBottom
              focused={focused}
              typeIcon="AntDesign"
              nameIcon="exception1"
              labelTx="congviec"
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
          tabBarButton: (props) => <ButtonAdd {...props} onPress={() => setIsvisible(true)} />,
        }}
      />
      <Tab.Screen
        name="manageScreen"
        component={ManagementScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <ItemBottom
              focused={focused}
              typeIcon="FontAwesome5"
              nameIcon="cloudscale"
              labelTx="quanly"
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
        width: (configs.windowWidth - 60) / 4,
        height: 2,
        backgroundColor: colors.primary500,
        position: 'absolute',
        bottom: configs.windowHeight / 11,
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

const ButtonAdd = ({ children , onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={$btnAdd} activeOpacity={0.9}>
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
  justifyContent: "center",
  paddingTop: 12,
  height: configs.windowHeight / 11
}
const $viewItem: ViewStyle = {
  alignItems: "center",
}
const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  color: colors.neutral500,
  marginTop: 4
}
const $btnAdd: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.primary500,
  top: -42,
  width: 60,
  height: 60,
  borderRadius: 30,
  ...configs.shadow,
}
