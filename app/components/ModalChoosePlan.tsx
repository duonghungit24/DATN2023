import * as React from "react"
import { StyleProp, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import Modal from "react-native-modal"
import { configs } from "../utils/configs"
import { Header } from "./Header"
import { VectorsIcon } from "./Vectoricon"
import { ModalCreatePlan } from "./ModalCreatePlan"
import { ModalCreateDiary } from "./ModalCreateDiary"

export interface ModalChoosePlanProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  isVisible: boolean
  onBackDropPress: () => void
}

/**
 * Describe your component here
 */
export const ModalChoosePlan = observer(function ModalChoosePlan(props: ModalChoosePlanProps) {
  const { style, isVisible, onBackDropPress } = props
  const $styles = [$container, style]
  const [isVisibleCreate, setIsvisibleCreate] = React.useState(0)

  return (
    <Modal
      isVisible={isVisible}
      style={$styles}
      animationInTiming={600}
      animationOutTiming={500}
      hideModalContentWhileAnimating={true}
    >
      <ModalCreatePlan isVisible={isVisibleCreate == 1} onBackDropPress={() => setIsvisibleCreate(0)}/>
      <ModalCreateDiary isVisible={isVisibleCreate == 2} onBackDropPress={() => setIsvisibleCreate(0)}/>
      <Header
        leftIcon="arrowleft"
        typeIconLeft="AntDesign"
        title="Hôm nay"
        backgroundColor={colors.neutral100}
        onLeftPress={onBackDropPress}
      />
      <View style={$viewPosition}>
      <ButtonSelectDay />
      <View style={$viewModal}>
        <Text style={$textPlan} tx="kehoach" /> 
        <View style={$viewBtn}>
          <ItemPlan
            textPlan="sukien"
            typeIcon="FontAwesome"
            nameIcon="calendar"
            colorIcon={colors.event}
            onPress={() => setIsvisibleCreate(1)}
          />
          <ItemPlan
            textPlan="congviec"
            typeIcon="FontAwesome5"
            nameIcon="check"
            colorIcon={colors.todo}
          
          />
          <ItemPlan
            textPlan="ghichu"
            typeIcon="FontAwesome"
            nameIcon="pencil"
            colorIcon={colors.memo}
            
          />
          <ItemPlan
            textPlan="nhatky"
            typeIcon="FontAwesome"
            nameIcon="file-text"
            colorIcon={colors.diary}
            onPress={() => setIsvisibleCreate(2)}
          />
        </View>
      </View>
      </View>
    </Modal>
  )
})
 
const ButtonSelectDay = () => {
  return (
    <TouchableOpacity style={$viewButton}>
        <Text style={$textButton}>Thứ Ba, 28 thg 3, 12:00 SA</Text>
        <VectorsIcon 
          type="Feather"
          name="chevron-down"
          size={20}
          color={colors.neutral000}
        />
    </TouchableOpacity>
  )
}

const ItemPlan = ({ typeIcon, nameIcon, colorIcon, textPlan, bgColor, onPress }: any) => {
  const $bgViewCircle = [$circlePlan, {backgroundColor: bgColor}]
  return (
    <TouchableOpacity style={$btnPlan} onPress={onPress}>
      <View style={$bgViewCircle}>
        <VectorsIcon type={typeIcon || "AntDesign"} name={nameIcon} size={25} color={colorIcon} />
      </View>
      <Text style={$textPlanItem} tx={textPlan} />
    </TouchableOpacity>
  )
}

const $container: ViewStyle = {
  flex: 1,
  margin: 0,
  backgroundColor: colors.neutral100,
  justifyContent: "flex-start",
}
const $viewPosition : ViewStyle = { top: configs.windowHeight / 6,   marginHorizontal: 16, alignItems: 'center'}
const $viewModal: ViewStyle = {
  height: configs.windowHeight / 4,
  backgroundColor: colors.neutral000,
  borderRadius: 8,
  ...configs.shadow,
  shadowOffset: {
    width: 0,
    height: 3,
  },
  shadowOpacity: 0.3,
  marginTop: 20
}
const $textPlan: TextStyle = {
  fontSize: 18,
  ...typography.textBold,
  textAlign: "center",
  padding: 16,
}
const $viewBtn: ViewStyle = {
  flexDirection: "row",
  paddingHorizontal: 16,
  marginTop: 20,
}
const $btnPlan: ViewStyle = {
  width: configs.windowWidth / 4 - 24,
  marginHorizontal: 4,
  justifyContent: "center",
  alignItems: "center",
}
const $circlePlan: ViewStyle = {
  height: 60,
  width: 60,
  backgroundColor: "white",
  borderRadius: 30,
  alignItems: "center",
  justifyContent: "center",
}
const $textPlanItem: TextStyle = {
  fontSize: 14,
  ...typography.textBoldMedium,
}
const $viewButton : ViewStyle = {
  flexDirection: 'row',
  height: 40,
  width: "70%",
  backgroundColor: colors.primary500,
  alignItems: 'center',
  justifyContent: "center",
  borderRadius: 12
}
const $textButton : TextStyle = {
  fontSize: 14,
  ...typography.textBold,
  color:colors.neutral000,
  marginRight: 8
}