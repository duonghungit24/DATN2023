/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import Config from "../config"
import {
  SplashScreen,
  SecurityScreen,
  ChangeLanguageScreen,
  ChooseLanguageScreen,
  OnboardingScreen,
  TodoScreen,
  MemoScreen,
  DiaryScreen,
  EventScreen,
  StatisticsScreen,
  DetailTodoScreen,
  DetailEventScreen,
  ResultSearchScreen,
  DetailDiaryScreen,
  DetailMemoScreen
} from "../screens"
import { BottomTabNavigator } from "./BottomTabNavigator"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  // 🔥 Your screens go here
  splashScreen: undefined
  securityScreen: undefined
  changeLanguageScreen: undefined
  chooseLanguageScreen: undefined
  bottomTab: undefined
  onboardingScreen: undefined
  todoScreen: undefined
  memoScreen: undefined
  diaryScreen: undefined
  eventScreen: undefined
  statisticsScreen: undefined
  detailTodoScreen: undefined
  detailEventScreen: undefined
  resultSearchScreen: undefined
  detailDiaryScreen : undefined
  detailMemoScreen: undefined
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="splashScreen">
      <Stack.Screen name="splashScreen" component={SplashScreen} />
      <Stack.Screen name="onboardingScreen" component={OnboardingScreen} />
      <Stack.Screen name="chooseLanguageScreen" component={ChooseLanguageScreen} />
      <Stack.Screen name="bottomTab" component={BottomTabNavigator} />
      <Stack.Screen name="memoScreen" component={MemoScreen} />
      <Stack.Screen name="securityScreen" component={SecurityScreen} />
      <Stack.Screen name="changeLanguageScreen" component={ChangeLanguageScreen} />
      <Stack.Screen name="eventScreen" component={EventScreen} />
      <Stack.Screen name="diaryScreen" component={DiaryScreen} />
      <Stack.Screen name="statisticsScreen" component={StatisticsScreen} />
      <Stack.Screen name="detailTodoScreen" component={DetailTodoScreen} />
      <Stack.Screen name="detailEventScreen" component={DetailEventScreen} />
      <Stack.Screen name="resultSearchScreen" component={ResultSearchScreen} />
      <Stack.Screen name="detailDiaryScreen" component={DetailDiaryScreen} />
      <Stack.Screen name="detailMemoScreen" component={DetailMemoScreen} />
      {/** 🔥 Your screens go here */}
    </Stack.Navigator>
  )
})

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      // theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
