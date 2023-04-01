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
type typeModal = {
  type: "note" | "diary",
  show: boolean
}
export const ModalChoosePlan = observer(function ModalChoosePlan(props: ModalChoosePlanProps) {
  const { style, isVisible, onBackDropPress } = props
  const $styles = [$container, style]
  const [isVisibleEventWork, setIsvisibleEventWork] = React.useState({ type: "", show: false })
  const [isVisibleNoteDiary, setIsvisibleNoteDiary] = React.useState<typeModal>({ type: "note", show: false })

  return (
    <Modal
      isVisible={isVisible}
      style={$styles}
      animationInTiming={600}
      animationOutTiming={500}
      hideModalContentWhileAnimating={true}
    >
      <ModalCreatePlan
        isVisible={isVisibleEventWork.show}
        onBackDropPress={() => setIsvisibleEventWork({ type: "", show: false })}
      />
      <ModalCreateDiary
        type={isVisibleNoteDiary.type}
        isVisible={isVisibleNoteDiary.show}
        onBackDropPress={() => setIsvisibleNoteDiary({ type: "note", show: false })}
      />
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
              textPlan="event"
              typeIcon="FontAwesome"
              nameIcon="calendar"
              colorIcon={colors.event}
              onPress={() => setIsvisibleEventWork({type: "", show:  true})}
            />
            <ItemPlan
              textPlan="work"
              typeIcon="FontAwesome5"
              nameIcon="check"
              colorIcon={colors.todo}
              onPress={() => setIsvisibleEventWork({type: "", show:  true})}
            />
            <ItemPlan
              textPlan="note"
              typeIcon="FontAwesome"
              nameIcon="pencil"
              colorIcon={colors.memo}
              onPress={() => setIsvisibleNoteDiary({type: "note", show: true})}
            />
            <ItemPlan
              textPlan="diary"
              typeIcon="FontAwesome"
              nameIcon="file-text"
              colorIcon={colors.diary}
              onPress={() => setIsvisibleNoteDiary({type: "diary", show: true})}
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
      <VectorsIcon type="Feather" name="chevron-down" size={20} color={colors.neutral000} />
    </TouchableOpacity>
  )
}

const ItemPlan = ({ typeIcon, nameIcon, colorIcon, textPlan, bgColor, onPress }: any) => {
  const $bgViewCircle = [$circlePlan, { backgroundColor: bgColor }]
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
const $viewPosition: ViewStyle = {
  top: configs.windowHeight / 6,
  marginHorizontal: 16,
  alignItems: "center",
}
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
  marginTop: 20,
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
const $viewButton: ViewStyle = {
  flexDirection: "row",
  height: 40,
  width: "70%",
  backgroundColor: colors.primary500,
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 12,
}
const $textButton: TextStyle = {
  fontSize: 14,
  ...typography.textBold,
  color: colors.neutral000,
  marginRight: 8,
}
